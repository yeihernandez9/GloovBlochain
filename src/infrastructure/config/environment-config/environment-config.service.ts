import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';
import { GloovConfig } from '../../../domain/web3/gloov.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig, GloovConfig {
  constructor(private configService: ConfigService) { }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getWeb3Url(): string {
    return this.configService.get<string>('BLOCKCHAIN_WEB3_URL');
  }
  getAccountMaster(): string {
    return this.configService.get<string>('BLOCKCHAIN_ACCOUNT_MASTER');
  }
  getAccountBond(): string {
    return this.configService.get<string>('BLOCKCHAIN_ACCOUNT_BOND');
  }
  getAccountWithdrawal(): string {
    return this.configService.get<string>('BLOCKCHAIN_ACCOUNT_WITHDRAWAL');
  }
  getAccountChargeBack(): string {
    return this.configService.get<string>('BLOCKCHAIN_ACCOUNT_CHARGEBACK');
  }
  getAccountReturn(): string {
    return this.configService.get<string>('BLOCKCHAIN_ACCOUNT_RETURN');
  }
  getMaxBlocks(): number {
    return this.configService.get<number>('MAX_BLOCK');
  }
}
