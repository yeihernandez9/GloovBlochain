import { IBlockchainService } from "src/domain/adapters/blockchain.interface";
import { ILogger } from "src/domain/logger/logger.interface";
import { GloovConfig } from "src/domain/web3/gloov.interface";
export declare class AddBoundsUseCases {
    private readonly gloovConfig;
    private readonly logger;
    private readonly blockchainService;
    ws: string;
    constructor(gloovConfig: GloovConfig, logger: ILogger, blockchainService: IBlockchainService);
    execute(): Promise<any>;
}
