"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTokensUseCases = void 0;
const common_1 = require("@nestjs/common");
class AddTokensUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const pkMaster = this.gloovConfig.getAccountMaster();
        const address = await this.blockchainService.getAddressPublic(pkMaster, this.ws);
        const balance = await this.blockchainService.balances(address, this.ws);
        this.logger.log('AddTokensUseCases execute', `address: ${address}, balance: ${balance}`);
        if (balance > 0 && value <= balance) {
            this.logger.log('AddTokensUseCases execute', `se puede hacer la tansaccinos `);
            const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
            const nonce = await this.blockchainService.getnonce(address, this.ws);
            this.logger.log('AddTokensUseCases execute', `nonce: ${nonce}`);
            const transaction = await this.blockchainService.transaction(address, nonce, accDestiny, convertWei, '21000', '0', pkMaster, this.ws);
            this.logger.log('AddTokensUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
            return transaction.transactionHash;
        }
        else {
            this.logger.log('AddTokensUseCases execute', `no tiene balance `);
            throw new common_1.NotFoundException();
        }
    }
}
exports.AddTokensUseCases = AddTokensUseCases;
//# sourceMappingURL=addTokens.usecases.js.map