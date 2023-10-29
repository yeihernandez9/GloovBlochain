import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
export declare class CreateAccountUseCases {
    private readonly gloovConfig;
    private readonly logger;
    private readonly blockchainService;
    constructor(gloovConfig: GloovConfig, logger: ILogger, blockchainService: IBlockchainService);
    execute(): Promise<any>;
}
