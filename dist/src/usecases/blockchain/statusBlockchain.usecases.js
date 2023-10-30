"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBoundsUseCases = void 0;
const blockchain_interface_1 = require("../../domain/adapters/blockchain.interface");
const logger_interface_1 = require("../../domain/logger/logger.interface");
const gloov_interface_1 = require("../../domain/web3/gloov.interface");
class AddBoundsUseCases {
    constructor(gloovConfig, logger, blockchainService) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute() {
        return "hola";
    }
}
exports.AddBoundsUseCases = AddBoundsUseCases;
//# sourceMappingURL=statusBlockchain.usecases.js.map