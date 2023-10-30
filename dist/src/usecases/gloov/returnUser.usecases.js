"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnUserUseCases = void 0;
const common_1 = require("@nestjs/common");
class ReturnUserUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const pkReturnUser = this.gloovConfig.getAccountReturn();
        const address = await this.blockchainService.getAddressPublic(pkReturnUser, this.ws);
        const balance = await this.blockchainService.balances(address, this.ws);
        if (address != accDestiny) {
            this.logger.log('ReturnUserUseCases execute', `address: ${address}, balance: ${balance}`);
            if (balance >= 0 && value <= balance) {
                this.logger.log('ReturnUserUseCases execute', `se puede hacer la tansaccinos `);
                const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                const nonce = await this.blockchainService.getnonce(address, this.ws);
                this.logger.log('ReturnUserUseCases execute', `nonce: ${nonce}`);
                const transaction = await this.blockchainService.transaction(address, nonce, accDestiny, convertWei, '21000', '0', pkReturnUser, this.ws);
                this.logger.log('ReturnUserUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                return transaction.transactionHash;
            }
            else {
                this.logger.log('ReturnUserUseCases execute', `no tiene balance `);
                throw new common_1.NotFoundException(`No tiene balance `);
            }
        }
        else {
            throw new common_1.NotFoundException("No se puede enviar a las mismas billeteras");
        }
    }
}
exports.ReturnUserUseCases = ReturnUserUseCases;
//# sourceMappingURL=returnUser.usecases.js.map