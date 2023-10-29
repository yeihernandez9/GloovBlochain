export interface GloovConfig {
    getWeb3Url(): string;
    getAccountMaster(): string;
    getAccountBond(): string;
    getAccountWithdrawal(): string;
    getAccountChargeBack(): string;
    getAccountReturn(): string;
    getMaxBlocks(): number;
}
