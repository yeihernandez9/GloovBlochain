"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalsUseCases = void 0;
const common_1 = require("@nestjs/common");
class WithdrawalsUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const address = await this.blockchainService.getAddressPublic(pkOrigin, this.ws);
        const pkWithDrawal = this.gloovConfig.getAccountWithdrawal();
        const addressWithDrawal = await this.blockchainService.getAddressPublic(pkWithDrawal, this.ws);
        if (value != 0) {
            if (address != addressWithDrawal) {
                const balance = await this.blockchainService.balances(address, this.ws);
                this.logger.log('WithdrawalsUseCases execute', `address: ${address}, balance: ${balance}`);
                if (balance >= 0 && value <= balance) {
                    this.logger.log('WithdrawalsUseCases execute', `se puede hacer la tansaccinos `);
                    const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                    const nonce = await this.blockchainService.getnonce(address, this.ws);
                    this.logger.log('WithdrawalsUseCases execute', `nonce: ${nonce}`);
                    const transaction = await this.blockchainService.transaction(address, nonce, addressWithDrawal, convertWei, '21000', '0', pkOrigin, this.ws);
                    this.logger.log('WithdrawalsUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                    return transaction.transactionHash;
                }
                else {
                    this.logger.log('WithdrawalsUseCases execute', `no tiene balance `);
                    throw new common_1.NotFoundException(`no tiene balance `);
                }
            }
            else {
                throw new common_1.NotFoundException("No se puede enviar a las mismas billeteras");
            }
        }
        else {
            throw new common_1.NotFoundException("No se permiten transacciones en CEROS");
        }
    }
}
exports.WithdrawalsUseCases = WithdrawalsUseCases;
//# sourceMappingURL=withdrawals.usecases.js.map