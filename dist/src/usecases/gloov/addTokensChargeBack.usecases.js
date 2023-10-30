"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTokensChargeBackUseCases = void 0;
const common_1 = require("@nestjs/common");
class AddTokensChargeBackUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const address = await this.blockchainService.getAddressPublic(pkOrigin, this.ws);
        const pkTokensCharge = this.gloovConfig.getAccountChargeBack();
        const addressChargeBack = await this.blockchainService.getAddressPublic(pkTokensCharge, this.ws);
        const balance = await this.blockchainService.balances(address, this.ws);
        this.logger.log('AddTokensChargeBackUseCases execute', `address: ${address}, balance: ${balance}`);
        if (balance >= 0 && value <= balance) {
            this.logger.log('AddTokensChargeBackUseCases execute', `se puede hacer la tansaccinos `);
            const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
            const nonce = await this.blockchainService.getnonce(address, this.ws);
            this.logger.log('AddTokensChargeBackUseCases execute', `nonce: ${nonce}`);
            const transaction = await this.blockchainService.transaction(address, nonce, addressChargeBack, convertWei, '21000', '0', pkOrigin, this.ws);
            this.logger.log('AddTokensChargeBackUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
            return transaction.transactionHash;
        }
        else {
            this.logger.log('AddTokensChargeBackUseCases execute', `no tiene balance `);
            throw new common_1.NotFoundException("no tiene balance");
        }
    }
}
exports.AddTokensChargeBackUseCases = AddTokensChargeBackUseCases;
//# sourceMappingURL=addTokensChargeBack.usecases.js.map