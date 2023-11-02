import { GloovConfig } from '../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuditRepository } from 'src/domain/repositories/auditRepository.interface';

export class AddBoundsUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
    private readonly auditRepository: AuditRepository
  ) { }

  async execute(pkOrigin: string, accDestiny: string, value: number): Promise<any> {
    const pkBondAcount = this.gloovConfig.getAccountBond();
    const address = await this.blockchainService.getAddressPublic(pkBondAcount, this.ws);
    const balance = await this.blockchainService.balances(address, this.ws);
    this.logger.log('AddTokensUseCases execute', `address: ${address}, balance: ${balance}`);
    if (value != 0) {
      if (balance >= 0 && value <= balance) {
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
          pkBondAcount,
          this.ws,
        );
        this.logger.log('AddTokensUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
        await this.auditRepository.insert(`Transaction from: ${address} to: ${accDestiny} Result: hash: ${transaction.transactionHash}`, `AddTokensUseCases`, value.toString());
        return transaction.transactionHash;
      } else {
        this.logger.log('AddTokensUseCases', `no tiene balance`);
        await this.auditRepository.insert(`No tiene balance: from: ${address} to: ${accDestiny}`, `AddTokensUseCases`, value.toString());

        throw new BadRequestException("no tiene balance");
      }
    } else {
      await this.auditRepository.insert(`No se permiten transacciones en CEROS: from: ${pkOrigin} to: ${accDestiny}`, `AddTokensUseCases`, value.toString());
      throw new BadRequestException("No se permiten transacciones en CEROS");
    }

  }
}
