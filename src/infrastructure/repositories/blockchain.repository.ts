import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockchainRepository } from '../../domain/repositories/blockchainRepository.interface';
import { Transactions } from '../entities/transactions.entity';

@Injectable()
export class DatabaseBlockchainRepository implements BlockchainRepository {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionEntityRepository: Repository<Transactions>,
  ) { }

  async findTransactionsBetweenBlock(fBlock: string, toBlock: string): Promise<any> {
    return this.transactionEntityRepository.createQueryBuilder('transactions')
      .where('transactions.block_number BETWEEN :from AND :to', { from: fBlock.toString(), to: toBlock.toString() }) // Utiliza fBlock
      .orderBy('transactions.block_number', 'ASC')
      .getMany();
  }
}