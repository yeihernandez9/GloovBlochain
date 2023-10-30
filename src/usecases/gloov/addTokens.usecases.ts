import { GloovConfig } from '../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { NotFoundException } from '@nestjs/common';

export class AddTokensUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
  ) {}

  async execute(pkOrigin: string, accDestiny: string, value: number): Promise<any> {
    const pkMaster = this.gloovConfig.getAccountMaster();
    const address = await this.blockchainService.getAddressPublic(pkMaster, this.ws);
    const balance = await this.blockchainService.balances(address, this.ws);
    this.logger.log('AddTokensUseCases execute', `address: ${address}, balance: ${balance}`);
    if (balance > 0 && value <= balance) {
    this.logger.log('AddTokensUseCases execute', `se puede hacer la tansaccinos `);
    const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
    const nonce = await this.blockchainService.getnonce(address, this.ws);
    this.logger.log('AddTokensUseCases execute', `nonce: ${nonce}`);
    const transaction = await this.blockchainService.transaction(
      address,
      nonce,
      accDestiny,
      convertWei,
      '21000',
      '0',
      pkMaster,
      this.ws,
    );
    this.logger.log('AddTokensUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
    return transaction.transactionHash;
    } else {
      this.logger.log('AddTokensUseCases execute', `no tiene balance `);
      throw new NotFoundException();
    }
  }
}