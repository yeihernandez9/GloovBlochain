import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuditRepository } from 'src/domain/repositories/auditRepository.interface';

export class SendTransactionUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
    private readonly auditRepository: AuditRepository
  ) { }

  async execute(pkOrigin: string, accDestiny: string, value: number): Promise<any> {
    console.log("value: ", value)
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
          await this.auditRepository.insert(`Transaction from: ${pkOrigin} to: ${accDestiny} Result: hash: ${transaction.transactionHash}`, `SendTransactionUseCases execute`, value.toString());
          return transaction.transactionHash;
        } else {
          await this.auditRepository.insert(`No tiene balance: from: ${pkOrigin} to: ${accDestiny}`, `SendTransactionUseCases`, value.toString());
          throw new BadRequestException("no tiene balance");
        }
      } else {
        await this.auditRepository.insert(`No se permiten transacciones en CEROS: from: ${pkOrigin} to: ${accDestiny}`, `SendTransactionUseCases`, value.toString());
        throw new BadRequestException("No se permiten transacciones en CEROS");
      }
    } else {
      await this.auditRepository.insert(`No se puede enviar a las mismas billeteras: from: ${pkOrigin} to: ${accDestiny}`, `SendTransactionUseCases`, value.toString());
      throw new BadRequestException("No se puede enviar a las mismas billeteras");
    }

  }
}
