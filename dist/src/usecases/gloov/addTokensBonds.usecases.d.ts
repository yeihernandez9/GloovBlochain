import { GloovConfig } from '../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
export declare class AddTokensBondsUseCases {
    private readonly gloovConfig;
    private readonly logger;
    private readonly blockchainService;
    ws: string;
    constructor(gloovConfig: GloovConfig, logger: ILogger, blockchainService: IBlockchainService);
    execute(pkOrigin: string, accDestiny: string, value: number): Promise<any>;
}
