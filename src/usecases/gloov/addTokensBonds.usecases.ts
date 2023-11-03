import { GloovConfig } from '../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuditRepository } from 'src/domain/repositories/auditRepository.interface';

export class AddTokensBondsUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
    private readonly auditRepository: AuditRepository
  ) { }

  async execute(pkOrigin: string, accDestiny: string, value: number): Promise<any> {
    const pkMaster = this.gloovConfig.getAccountMaster();
    const address = await this.blockchainService.getAddressPublic(pkMaster, this.ws);
    const pkBondAcount = this.gloovConfig.getAccountBond();
    const addressDestiny = await this.blockchainService.getAddressPublic(pkBondAcount, this.ws);
    const balance = await this.blockchainService.balances(address, this.ws);
    this.logger.log('AddTokensBondsUseCases execute', `address: ${address}, balance: ${balance}`);
    if (value != 0) {
      if (balance >= 0 && value <= balance) {
        this.logger.log('AddTokensBondsUseCases execute', `se puede hacer la tansaccinos `);
        const convertWei = await this.blockchainService.convertEtherToWei(value, this.ws);
        const nonce = await this.blockchainService.getnonce(address, this.ws);
        this.logger.log('AddTokensBondsUseCases execute', `nonce: ${nonce}`);
        const transaction = await this.blockchainService.transaction(
          address,
          nonce,
          addressDestiny,
          convertWei,
          '21000',
          '0',
          pkMaster,
          this.ws,
        );
        this.logger.log('AddTokensBondsUseCases execute', `Transaction hash: ${transaction.transactionHash}`);
        await this.auditRepository.insert(`Transaction from: ${address} to: ${accDestiny} Result: hash: ${transaction.transactionHash}`, `AddTokensBondsUseCases`, value.toString());
        return transaction.transactionHash;
      } else {
        this.logger.log('AddTokensBondsUseCases execute', `no tiene balance `);
        await this.auditRepository.insert(`No tiene balance: from: ${address} to: ${accDestiny}`, `AddTokensBondsUseCases`, value.toString());
        throw new BadRequestException("no tiene balance");
      }
    } else {
      await this.auditRepository.insert(`No se permiten transacciones en CEROS from: ${address} to: ${accDestiny}`, `AddTokensBondsUseCases`, value.toString());
      throw new BadRequestException("No se permiten transacciones en CEROS");
    }

  }
}
