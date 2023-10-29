"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalanceUseCases = void 0;
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
            return balance;
        }
        catch (error) {
            this.logger.error('Error al obtener el balance:', error);
            return error;
        }
    }
}
exports.GetBalanceUseCases = GetBalanceUseCases;
//# sourceMappingURL=getBalance.usecases.js.map