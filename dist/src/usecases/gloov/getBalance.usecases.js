"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalanceUseCases = void 0;
const common_1 = require("@nestjs/common");
class GetBalanceUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
    }
    async execute(address) {
        try {
            const ws = this.gloovConfig.getWeb3Url();
            const balance = await this.blockchainService.balances(address, ws);
            this.logger.log('getBalanceUseCases execute', `balance: ${balance}`);
            return parseFloat(balance.toString());
        }
        catch (error) {
            this.logger.error('Error al obtener el balance:', error);
            throw new common_1.BadRequestException("Error al obtener el balance:" + error);
        }
    }
}
exports.GetBalanceUseCases = GetBalanceUseCases;
//# sourceMappingURL=getBalance.usecases.js.map