"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBoundsUseCases = void 0;
const common_1 = require("@nestjs/common");
class AddBoundsUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
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
                return transaction.transactionHash;
            }
            else {
                this.logger.log('AddTokensUseCases execute', `no tiene balance `);
                throw new common_1.NotFoundException("no tiene balance");
            }
        }
        else {
            throw new common_1.NotFoundException("No se permiten transacciones en CEROS");
        }
    }
}
exports.AddBoundsUseCases = AddBoundsUseCases;
//# sourceMappingURL=addBounds.usecases.js.map