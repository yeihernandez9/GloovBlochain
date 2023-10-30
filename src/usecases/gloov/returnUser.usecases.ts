import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { NotFoundException } from '@nestjs/common';

export class ReturnUserUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
  ) { }

  async execute(pkOrigin: string, accDestiny: string, value: number): Promise<any> {
    const pkReturnUser = this.gloovConfig.getAccountReturn()
    const address = await this.blockchainService.getAddressPublic(pkReturnUser, this.ws);
    const balance = await this.blockchainService.balances(address, this.ws);
    if (address != accDestiny) {
      this.logger.log('ReturnUserUseCases execute', `address: ${address}, balance: ${balance}`);
      if (value != 0) {
        if (balance >= 0 && value <= balance) {
          this.logger.log('ReturnUserUseCases execute', `se puede hacer la tansaccinos `);
          const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
          const nonce = await this.blockchainService.getnonce(address, this.ws);
          this.logger.log('ReturnUserUseCases execute', `nonce: ${nonce}`);
          const transaction = await this.blockchainService.transaction(
            address,
            nonce,
            accDestiny,
            convertWei,
            '21000',
            '0',
            pkReturnUser,
            this.ws,
          );
          this.logger.log('ReturnUserUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
          return transaction.transactionHash;
        } else {
          this.logger.log('ReturnUserUseCases execute', `no tiene balance `);
          throw new NotFoundException(`No tiene balance `);
        }
      } else {
        throw new NotFoundException("No se permiten transacciones en CEROS");
      }
    } else {

      throw new NotFoundException("No se puede enviar a las mismas billeteras");
    }

  }
}
