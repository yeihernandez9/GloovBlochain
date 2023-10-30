"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendTransactionUseCases = void 0;
const common_1 = require("@nestjs/common");
class SendTransactionUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const address = await this.blockchainService.getAddressPublic(pkOrigin, this.ws);
        if (address != accDestiny) {
            const balance = await this.blockchainService.balances(address, this.ws);
            this.logger.log('SendTransactionUseCases execute', `address: ${address}, balance: ${balance}`);
            if (balance >= 0 && value <= balance) {
                this.logger.log('SendTransactionUseCases execute', `se puede hacer la tansaccinos `);
                const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                const nonce = await this.blockchainService.getnonce(address, this.ws);
                this.logger.log('SendTransactionUseCases execute', `nonce: ${nonce}`);
                const transaction = await this.blockchainService.transaction(address, nonce, accDestiny, convertWei, '21000', '0', pkOrigin, this.ws);
                this.logger.log('SendTransactionUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                return transaction.transactionHash;
            }
            else {
                this.logger.log('SendTransactionUseCases execute', `no tiene balance `);
                throw new common_1.NotFoundException("no tiene balance");
            }
        }
        else {
            throw new common_1.NotFoundException("No se puede enviar a las mismas billeteras");
        }
    }
}
exports.SendTransactionUseCases = SendTransactionUseCases;
//# sourceMappingURL=sendTransaction.usecases.js.map