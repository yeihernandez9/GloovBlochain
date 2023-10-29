export interface BlockchainRepository {
    findTransactionsBetweenBlock(fBlock: any, toBlock: any): Promise<any>
}