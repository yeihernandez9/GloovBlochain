import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';

export class GetBalanceUseCases {
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
  ) {}

  async execute(address: string): Promise<number> {
    try {
      const ws = this.gloovConfig.getWeb3Url();
      const balance = await this.blockchainService.balances(address, ws);
      this.logger.log('getBalanceUseCases execute', `balance: ${balance}`);
      return balance;
    } catch (error) {
      this.logger.error('Error al obtener el balance:', error);
      return error;
    }
  }
}
