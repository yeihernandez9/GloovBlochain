import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { NotFoundException } from '@nestjs/common';

export class SendTransactionUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
  ) { }

  async execute(pkOrigin: string, accDestiny: string, value: number): Promise<any> {

    const address = await this.blockchainService.getAddressPublic(pkOrigin, this.ws);
    if (address != accDestiny) {
      const balance = await this.blockchainService.balances(address, this.ws);
      this.logger.log('SendTransactionUseCases execute', `address: ${address}, balance: ${balance}`);
      if (value != 0) {
        if (balance >= 0 && value <= balance) {
          this.logger.log('SendTransactionUseCases execute', `se puede hacer la tansaccinos `);
          const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
          const nonce = await this.blockchainService.getnonce(address, this.ws);
          this.logger.log('SendTransactionUseCases execute', `nonce: ${nonce}`);
          const transaction = await this.blockchainService.transaction(
            address,
            nonce,
            accDestiny,
            convertWei,
            '21000',
            '0',
            pkOrigin,
            this.ws,
          );
          this.logger.log('SendTransactionUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
          return transaction.transactionHash;
        } else {
          this.logger.log('SendTransactionUseCases execute', `no tiene balance `);

          throw new NotFoundException("no tiene balance");
        }
      } else {
        throw new NotFoundException("No se permiten transacciones en CEROS");
      }
    } else {
      throw new NotFoundException("No se puede enviar a las mismas billeteras");
    }

  }
}
