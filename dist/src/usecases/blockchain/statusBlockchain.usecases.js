"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBlockchainUseCases = void 0;
const blockchain_interface_1 = require("../../domain/adapters/blockchain.interface");
const logger_interface_1 = require("../../domain/logger/logger.interface");
const gloov_interface_1 = require("../../domain/web3/gloov.interface");
class StatusBlockchainUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute() {
        const status = this.blockchainService.statusNode(this.ws);
        return status;
    }
}
exports.StatusBlockchainUseCases = StatusBlockchainUseCases;
//# sourceMappingURL=statusBlockchain.usecases.js.map