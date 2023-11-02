"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashReturnUseCases = void 0;
const common_1 = require("@nestjs/common");
const auditRepository_interface_1 = require("../../domain/repositories/auditRepository.interface");
class CashReturnUseCases {
    constructor(gloovConfig, logger, blockchainService, auditRepository) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.auditRepository = auditRepository;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const pkAccountReturn = this.gloovConfig.getAccountWithdrawal();
        const address = await this.blockchainService.getAddressPublic(pkAccountReturn, this.ws);
        const pkReturnAccount = this.gloovConfig.getAccountReturn();
        const addressReturnAccount = await this.blockchainService.getAddressPublic(pkReturnAccount, this.ws);
        const balance = await this.blockchainService.balances(address, this.ws);
        this.logger.log('CashReturnUseCases execute', `address: ${address}, balance: ${balance}`);
        if (value != 0) {
            if (balance >= 0 && value <= balance) {
                this.logger.log('CashReturnUseCases execute', `se puede hacer la tansaccinos `);
                const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                const nonce = await this.blockchainService.getnonce(address, this.ws);
                this.logger.log('CashReturnUseCases execute', `nonce: ${nonce}`);
                const transaction = await this.blockchainService.transaction(address, nonce, addressReturnAccount, convertWei, '21000', '0', pkAccountReturn, this.ws);
                this.logger.log('CashReturnUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                await this.auditRepository.insert(`Transaction from: ${address} to: ${addressReturnAccount} Result: hash: ${transaction.transactionHash}`, `CashReturnUseCases`, value.toString());
                return transaction.transactionHash;
            }
            else {
                this.logger.log('CashReturnUseCases execute', `no tiene balance `);
                await this.auditRepository.insert(`No tiene balance: from: ${address} to: ${addressReturnAccount}`, `CashReturnUseCases`, value.toString());
                throw new common_1.BadRequestException("no tiene balance");
            }
        }
        else {
            await this.auditRepository.insert(`No se permiten transacciones en CEROS from: ${address} to: ${addressReturnAccount}`, `CashReturnUseCases`, value.toString());
            throw new common_1.BadRequestException("No se permiten transacciones en CEROS");
        }
    }
}
exports.CashReturnUseCases = CashReturnUseCases;
//# sourceMappingURL=cashReturn.usecases.js.map