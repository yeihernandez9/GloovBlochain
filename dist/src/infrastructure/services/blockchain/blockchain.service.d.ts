import { IBlockchainService } from '../../../domain/adapters/blockchain.interface';
export declare class BlockchainService implements IBlockchainService {
    getNumberBlock(ws: string): Promise<number>;
    transaction(address: string, nonce: string, to: string, value: string, gas: string, gasPrice: string, addressB: string, ws: string): Promise<any>;
    getnonce(address: string, ws: string): Promise<any>;
    convertEtherToWei(value: number, ws: string): Promise<any>;
    createAccount(ws: string): Promise<any>;
    getAddressPublic(privateKey: string, ws: string): Promise<string>;
    balances(address: string, ws: string): Promise<number>;
    getFromWei(balanceWei: string, ws: string): Promise<number>;
}
