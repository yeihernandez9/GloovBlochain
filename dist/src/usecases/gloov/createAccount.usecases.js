"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountUseCases = void 0;
const common_1 = require("@nestjs/common");
class CreateAccountUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
    }
    async execute() {
        try {
            const ws = this.gloovConfig.getWeb3Url();
            const account = this.blockchainService.createAccount(ws);
            this.logger.log('CreateAccountUseCases execute', `Account: ${account}`);
            return account;
        }
        catch (error) {
            this.logger.error('Error create account:', error);
            throw new common_1.BadRequestException("No se puede crear billetera");
        }
    }
}
exports.CreateAccountUseCases = CreateAccountUseCases;
//# sourceMappingURL=createAccount.usecases.js.map