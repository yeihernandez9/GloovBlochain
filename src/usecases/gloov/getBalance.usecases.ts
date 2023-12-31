import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class GetBalanceUseCases {
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
  ) { }

  async execute(address: string): Promise<any> {
    try {
      const ws = this.gloovConfig.getWeb3Url();
      const balance = await this.blockchainService.balances(address, ws);
      this.logger.log('getBalanceUseCases execute', `balance: ${balance}`);
      return parseFloat(balance.toString()).toFixed(2);
    } catch (error) {
      this.logger.error('Error al obtener el balance:', error);
      throw new BadRequestException("Error al obtener el balance:" + error);
    }
  }
}
