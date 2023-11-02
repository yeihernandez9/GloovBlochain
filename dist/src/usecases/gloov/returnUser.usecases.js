"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnUserUseCases = void 0;
const common_1 = require("@nestjs/common");
const auditRepository_interface_1 = require("../../domain/repositories/auditRepository.interface");
class ReturnUserUseCases {
    constructor(gloovConfig, logger, blockchainService, auditRepository) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.auditRepository = auditRepository;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const pkReturnUser = this.gloovConfig.getAccountReturn();
        const address = await this.blockchainService.getAddressPublic(pkReturnUser, this.ws);
        const balance = await this.blockchainService.balances(address, this.ws);
        if (address != accDestiny) {
            this.logger.log('ReturnUserUseCases execute', `address: ${address}, balance: ${balance}`);
            if (value != 0) {
                if (balance >= 0 && value <= balance) {
                    this.logger.log('ReturnUserUseCases execute', `se puede hacer la tansaccinos `);
                    const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                    const nonce = await this.blockchainService.getnonce(address, this.ws);
                    this.logger.log('ReturnUserUseCases execute', `nonce: ${nonce}`);
                    const transaction = await this.blockchainService.transaction(address, nonce, accDestiny, convertWei, '21000', '0', pkReturnUser, this.ws);
                    this.logger.log('ReturnUserUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                    await this.auditRepository.insert(`Transaction from: ${address} to: ${accDestiny} Result: hash: ${transaction.transactionHash}`, `ReturnUserUseCases`, value.toString());
                    return transaction.transactionHash;
                }
                else {
                    this.logger.log('ReturnUserUseCases execute', `no tiene balance `);
                    await this.auditRepository.insert(`No tiene balance: from: ${address} to: ${accDestiny}`, `ReturnUserUseCases`, value.toString());
                    throw new common_1.BadRequestException(`No tiene balance `);
                }
            }
            else {
                await this.auditRepository.insert(`No se permiten transacciones en CEROS from: ${address} to: ${accDestiny}`, `ReturnUserUseCases`, value.toString());
                throw new common_1.BadRequestException("No se permiten transacciones en CEROS");
            }
        }
        else {
            await this.auditRepository.insert(`No se puede enviar a las mismas billeteras from: ${address} to: ${accDestiny}`, `ReturnUserUseCases`, value.toString());
            throw new common_1.BadRequestException("No se puede enviar a las mismas billeteras");
        }
    }
}
exports.ReturnUserUseCases = ReturnUserUseCases;
//# sourceMappingURL=returnUser.usecases.js.map