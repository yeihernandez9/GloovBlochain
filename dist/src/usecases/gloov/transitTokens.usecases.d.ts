import { GloovConfig } from '../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { BlockchainRepository } from '../../domain/repositories/blockchainRepository.interface';
import { AccountTransitDTO } from './dto/accountTransitDTO.dto';
import Decimal from 'decimal.js';
export declare class TransitTokensUseCases {
    private readonly gloovConfig;
    private readonly logger;
    private readonly blockchainService;
    private readonly blockchainRepository;
    ws: string;
    constructor(gloovConfig: GloovConfig, logger: ILogger, blockchainService: IBlockchainService, blockchainRepository: BlockchainRepository);
    execute(publicKey: string): Promise<any>;
    verifyTransaction(balances: {}, values: AccountTransitDTO, toAddress: string, toBlock: any, fBlock: number, tBlock: number, msAccount: string, bAccount: string, prevTra: any, txs: any): Promise<AccountTransitDTO>;
    verifyTransaction2(balances: {}, values: AccountTransitDTO, toAddress: string, toBlock: number, fBlock: number, tBlock: any, msAccount: string, bAccount: string, prevTra: any, txs: any[], totalTx: any): Promise<void>;
    evalueList2(env: any, toBlock: number): Promise<Decimal>;
    evalueList(env: any, toBlock: number): Promise<Decimal>;
    processList(from: string, to: string, fBlock: number, toBlock: number, resp: any): Promise<any>;
    processListOr(from: string, to: string, fBlock: number, toBlock: any, txs: any): Promise<any[]>;
    bytesToHex(bytes: any): Promise<string>;
}
