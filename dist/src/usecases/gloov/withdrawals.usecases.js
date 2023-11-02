"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalsUseCases = void 0;
const common_1 = require("@nestjs/common");
const auditRepository_interface_1 = require("../../domain/repositories/auditRepository.interface");
class WithdrawalsUseCases {
    constructor(gloovConfig, logger, blockchainService, auditRepository) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.auditRepository = auditRepository;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(pkOrigin, accDestiny, value) {
        const address = await this.blockchainService.getAddressPublic(pkOrigin, this.ws);
        const pkWithDrawal = this.gloovConfig.getAccountWithdrawal();
        const addressWithDrawal = await this.blockchainService.getAddressPublic(pkWithDrawal, this.ws);
        if (value != 0) {
            if (address != addressWithDrawal) {
                const balance = await this.blockchainService.balances(address, this.ws);
                console.log(balance);
                this.logger.log('WithdrawalsUseCases execute', `address: ${address}, balance: ${balance}`);
                if (balance >= 0 && value <= balance) {
                    this.logger.log('WithdrawalsUseCases execute', `se puede hacer la tansaccinos `);
                    const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
                    const nonce = await this.blockchainService.getnonce(address, this.ws);
                    this.logger.log('WithdrawalsUseCases execute', `nonce: ${nonce}`);
                    const transaction = await this.blockchainService.transaction(address, nonce, addressWithDrawal, convertWei, '21000', '0', pkOrigin, this.ws);
                    this.logger.log('WithdrawalsUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
                    await this.auditRepository.insert(`Transaction from: ${address} to: ${addressWithDrawal} Result: hash: ${transaction.transactionHash}`, `WithdrawalsUseCases`, value.toString());
                    return transaction.transactionHash;
                }
                else {
                    this.logger.log('WithdrawalsUseCases execute', `no tiene balance `);
                    await this.auditRepository.insert(`No tiene balance: from: ${address} to: ${addressWithDrawal}`, `WithdrawalsUseCases`, value.toString());
                    throw new common_1.BadRequestException(`no tiene balance `);
                }
            }
            else {
                await this.auditRepository.insert(`No se puede enviar a las mismas billeteras from: ${address} to: ${addressWithDrawal}`, `WithdrawalsUseCases`, value.toString());
                throw new common_1.BadRequestException("No se puede enviar a las mismas billeteras");
            }
        }
        else {
            await this.auditRepository.insert(`No se permiten transacciones en CEROS: ${address} to: ${addressWithDrawal}`, `WithdrawalsUseCases`, value.toString());
            throw new common_1.BadRequestException("No se permiten transacciones en CEROS");
        }
    }
}
exports.WithdrawalsUseCases = WithdrawalsUseCases;
//# sourceMappingURL=withdrawals.usecases.js.map