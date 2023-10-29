import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';
import { GloovConfig } from '../../../domain/web3/gloov.interface';
export declare class EnvironmentConfigService implements DatabaseConfig, JWTConfig, GloovConfig {
    private configService;
    constructor(configService: ConfigService);
    getJwtSecret(): string;
    getJwtExpirationTime(): string;
    getJwtRefreshSecret(): string;
    getJwtRefreshExpirationTime(): string;
    getDatabaseHost(): string;
    getDatabasePort(): number;
    getDatabaseUser(): string;
    getDatabasePassword(): string;
    getDatabaseName(): string;
    getDatabaseSchema(): string;
    getDatabaseSync(): boolean;
    getWeb3Url(): string;
    getAccountMaster(): string;
    getAccountBond(): string;
    getAccountWithdrawal(): string;
    getAccountChargeBack(): string;
    getAccountReturn(): string;
    getMaxBlocks(): number;
}
