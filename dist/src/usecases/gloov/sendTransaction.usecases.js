"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendTransactionUseCases = void 0;
const common_1 = require("@nestjs/common");
const auditRepository_interface_1 = require("../../domain/repositories/auditRepository.interface");
class SendTransactionUseCases {
    constructor(gloovConfig, logger, blockchainService, auditRepository) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.auditRepository = auditRepository;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const address = await this.blockchainService.getAddressPublic(pkOrigin, this.ws);
        if (address != accDestiny) {
            const balance = await this.blockchainService.balances(address, this.ws);
            this.logger.log('SendTransactionUseCases execute', `address: ${address}, balance: ${balance}`);
            if (value != 0) {
                if (balance >= 0 && value <= balance) {
                    this.logger.log('SendTransactionUseCases execute', `se puede hacer la tansaccinos `);
                    const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                    const nonce = await this.blockchainService.getnonce(address, this.ws);
                    this.logger.log('SendTransactionUseCases execute', `nonce: ${nonce}`);
                    const transaction = await this.blockchainService.transaction(address, nonce, accDestiny, convertWei, '21000', '0', pkOrigin, this.ws);
                    this.logger.log('SendTransactionUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                    await this.auditRepository.insert(`Transaction from: ${pkOrigin} to: ${accDestiny} Result: hash: ${transaction.transactionHash}`, `SendTransactionUseCases execute`, value.toString());
                    return transaction.transactionHash;
                }
                else {
                    await this.auditRepository.insert(`No tiene balance: from: ${pkOrigin} to: ${accDestiny}`, `SendTransactionUseCases`, value.toString());
                    throw new common_1.BadRequestException("no tiene balance");
                }
            }
            else {
                await this.auditRepository.insert(`No se permiten transacciones en CEROS: from: ${pkOrigin} to: ${accDestiny}`, `SendTransactionUseCases`, value.toString());
                throw new common_1.BadRequestException("No se permiten transacciones en CEROS");
            }
        }
        else {
            await this.auditRepository.insert(`No se puede enviar a las mismas billeteras: from: ${pkOrigin} to: ${accDestiny}`, `SendTransactionUseCases`, value.toString());
            throw new common_1.BadRequestException("No se puede enviar a las mismas billeteras");
        }
    }
}
exports.SendTransactionUseCases = SendTransactionUseCases;
//# sourceMappingURL=sendTransaction.usecases.js.map