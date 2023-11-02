import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuditRepository } from 'src/domain/repositories/auditRepository.interface';

export class ReturnUserUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
    private readonly auditRepository: AuditRepository
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
          await this.auditRepository.insert(`Transaction from: ${address} to: ${accDestiny} Result: hash: ${transaction.transactionHash}`, `ReturnUserUseCases`, value.toString());
          return transaction.transactionHash;
        } else {
          this.logger.log('ReturnUserUseCases execute', `no tiene balance `);
          await this.auditRepository.insert(`No tiene balance: from: ${address} to: ${accDestiny}`, `ReturnUserUseCases`, value.toString());
          throw new BadRequestException(`No tiene balance `);
        }
      } else {
        await this.auditRepository.insert(`No se permiten transacciones en CEROS from: ${address} to: ${accDestiny}`, `ReturnUserUseCases`, value.toString());
        throw new BadRequestException("No se permiten transacciones en CEROS");
      }
    } else {
      await this.auditRepository.insert(`No se puede enviar a las mismas billeteras from: ${address} to: ${accDestiny}`, `ReturnUserUseCases`, value.toString());
      throw new BadRequestException("No se puede enviar a las mismas billeteras");
    }

  }
}
