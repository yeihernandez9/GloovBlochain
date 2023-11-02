import { IBlockchainService } from "src/domain/adapters/blockchain.interface";
import { ILogger } from "src/domain/logger/logger.interface";
import { GloovConfig } from "src/domain/web3/gloov.interface";

export class StatusBlockchainUseCases {
    ws: string = this.gloovConfig.getWeb3Url();
    constructor(
        private readonly gloovConfig: GloovConfig,
        private readonly logger: ILogger,
        private readonly blockchainService: IBlockchainService,

    ) { }

    async execute(): Promise<any> {
        const status = this.blockchainService.statusNode(this.ws)
        return status
    }
}