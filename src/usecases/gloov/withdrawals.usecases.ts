import { GloovConfig } from './../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { BadGatewayException, BadRequestException, NotFoundException } from '@nestjs/common';
import { AuditRepository } from 'src/domain/repositories/auditRepository.interface';

export class WithdrawalsUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
    private readonly auditRepository: AuditRepository
  ) { }

  async execute(pkOrigin: string, accDestiny: string, value: number): Promise<any> {
    const address = await this.blockchainService.getAddressPublic(pkOrigin, this.ws);
    const pkWithDrawal = this.gloovConfig.getAccountWithdrawal();
    const addressWithDrawal = await this.blockchainService.getAddressPublic(pkWithDrawal, this.ws);
    if (value != 0) {
      if (address != addressWithDrawal) {
        const balance = await this.blockchainService.balances(address, this.ws);
        console.log(balance)
        this.logger.log('WithdrawalsUseCases execute', `address: ${address}, balance: ${balance}`);
        if (balance >= 0 && value <= balance) {
          this.logger.log('WithdrawalsUseCases execute', `se puede hacer la tansaccinos `);
          const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
          const nonce = await this.blockchainService.getnonce(address, this.ws);
          this.logger.log('WithdrawalsUseCases execute', `nonce: ${nonce}`);
          const transaction = await this.blockchainService.transaction(
            address,
            nonce,
            addressWithDrawal,
            convertWei,
            '21000',
            '0',
            pkOrigin,
            this.ws,
          );
          this.logger.log('WithdrawalsUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
          await this.auditRepository.insert(`Transaction from: ${address} to: ${addressWithDrawal} Result: hash: ${transaction.transactionHash}`, `WithdrawalsUseCases`, value.toString());
          return transaction.transactionHash;
        } else {
          this.logger.log('WithdrawalsUseCases execute', `no tiene balance `);
          await this.auditRepository.insert(`No tiene balance: from: ${address} to: ${addressWithDrawal}`, `WithdrawalsUseCases`, value.toString());
          throw new BadRequestException(`no tiene balance `);
        }
      } else {
        await this.auditRepository.insert(`No se puede enviar a las mismas billeteras from: ${address} to: ${addressWithDrawal}`, `WithdrawalsUseCases`, value.toString());
        throw new BadRequestException("No se puede enviar a las mismas billeteras");
      }
    } else {
      await this.auditRepository.insert(`No se permiten transacciones en CEROS: ${address} to: ${addressWithDrawal}`, `WithdrawalsUseCases`, value.toString());
      throw new BadRequestException("No se permiten transacciones en CEROS");
    }

  }
}
