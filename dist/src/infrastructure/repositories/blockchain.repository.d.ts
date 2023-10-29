import { Repository } from 'typeorm';
import { BlockchainRepository } from '../../domain/repositories/blockchainRepository.interface';
import { Transactions } from '../entities/transactions.entity';
export declare class DatabaseBlockchainRepository implements BlockchainRepository {
    private readonly transactionEntityRepository;
    constructor(transactionEntityRepository: Repository<Transactions>);
    findTransactionsBetweenBlock(fBlock: string, toBlock: string): Promise<any>;
}
