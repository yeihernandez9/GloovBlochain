import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';

export class CreateAccountUseCases {
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
  ) {}

  async execute(): Promise<any> {
    try {
      const ws = this.gloovConfig.getWeb3Url();
      const account = this.blockchainService.createAccount(ws);
      this.logger.log('CreateAccountUseCases execute', `Account: ${account}`);
      return account;
    } catch (error) {
      this.logger.error('Error create account:', error);
      return error;
    }
  }
}
