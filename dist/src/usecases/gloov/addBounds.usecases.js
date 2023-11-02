"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBoundsUseCases = void 0;
const common_1 = require("@nestjs/common");
const auditRepository_interface_1 = require("../../domain/repositories/auditRepository.interface");
class AddBoundsUseCases {
    constructor(gloovConfig, logger, blockchainService, auditRepository) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.auditRepository = auditRepository;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const pkBondAcount = this.gloovConfig.getAccountBond();
        const address = await this.blockchainService.getAddressPublic(pkBondAcount, this.ws);
        const balance = await this.blockchainService.balances(address, this.ws);
        this.logger.log('AddTokensUseCases execute', `address: ${address}, balance: ${balance}`);
        if (value != 0) {
            if (balance >= 0 && value <= balance) {
                this.logger.log('AddTokensUseCases execute', `se puede hacer la tansaccinos `);
                const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                const nonce = await this.blockchainService.getnonce(address, this.ws);
                this.logger.log('AddTokensUseCases execute', `nonce: ${nonce}`);
                const transaction = await this.blockchainService.transaction(address, nonce, accDestiny, convertWei, '21000', '0', pkBondAcount, this.ws);
                this.logger.log('AddTokensUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                await this.auditRepository.insert(`Transaction from: ${address} to: ${accDestiny} Result: hash: ${transaction.transactionHash}`, `AddTokensUseCases`, value.toString());
                return transaction.transactionHash;
            }
            else {
                this.logger.log('AddTokensUseCases', `no tiene balance`);
                await this.auditRepository.insert(`No tiene balance: from: ${address} to: ${accDestiny}`, `AddTokensUseCases`, value.toString());
                throw new common_1.BadRequestException("no tiene balance");
            }
        }
        else {
            await this.auditRepository.insert(`No se permiten transacciones en CEROS: from: ${pkOrigin} to: ${accDestiny}`, `AddTokensUseCases`, value.toString());
            throw new common_1.BadRequestException("No se permiten transacciones en CEROS");
        }
    }
}
exports.AddBoundsUseCases = AddBoundsUseCases;
//# sourceMappingURL=addBounds.usecases.js.map