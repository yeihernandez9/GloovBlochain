"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTokensBondsUseCases = void 0;
const common_1 = require("@nestjs/common");
class AddTokensBondsUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const pkMaster = this.gloovConfig.getAccountMaster();
        const address = await this.blockchainService.getAddressPublic(pkMaster, this.ws);
        const pkBondAcount = this.gloovConfig.getAccountBond();
        const addressDestiny = await this.blockchainService.getAddressPublic(pkBondAcount, this.ws);
        const balance = await this.blockchainService.balances(address, this.ws);
        this.logger.log('AddTokensBondsUseCases execute', `address: ${address}, balance: ${balance}`);
        if (value != 0) {
            if (balance >= 0 && value <= balance) {
                this.logger.log('AddTokensBondsUseCases execute', `se puede hacer la tansaccinos `);
                const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                const nonce = await this.blockchainService.getnonce(address, this.ws);
                this.logger.log('AddTokensBondsUseCases execute', `nonce: ${nonce}`);
                const transaction = await this.blockchainService.transaction(address, nonce, addressDestiny, convertWei, '21000', '0', pkMaster, this.ws);
                this.logger.log('AddTokensBondsUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                return transaction.transactionHash;
            }
            else {
                this.logger.log('AddTokensBondsUseCases execute', `no tiene balance `);
                throw new common_1.NotFoundException("no tiene balance");
            }
        }
        else {
            throw new common_1.NotFoundException("No se permiten transacciones en CEROS");
        }
    }
}
exports.AddTokensBondsUseCases = AddTokensBondsUseCases;
//# sourceMappingURL=addTokensBonds.usecases.js.map