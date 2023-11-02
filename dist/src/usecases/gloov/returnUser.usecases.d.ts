import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { AuditRepository } from 'src/domain/repositories/auditRepository.interface';
export declare class ReturnUserUseCases {
    private readonly gloovConfig;
    private readonly logger;
    private readonly blockchainService;
    private readonly auditRepository;
    ws: string;
    constructor(gloovConfig: GloovConfig, logger: ILogger, blockchainService: IBlockchainService, auditRepository: AuditRepository);
    execute(pkOrigin: string, accDestiny: string, value: number): Promise<any>;
}
