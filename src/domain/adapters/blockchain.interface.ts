export interface IBlockchainService {
  balances(address: string, ws: string): Promise<number>;
  getAddressPublic(privateKey: string, ws: string): Promise<string>;
  createAccount(ws: string): Promise<any>;
  convertEtherToWei(value: number, ws: string): Promise<any>;
  getnonce(address: string, ws: string): Promise<any>;
  transaction(
    address: string,
    nonce: string,
    to: string,
    value: string,
    gas: string,
    gasPrice: string,
    addressB: string,
    ws: string,
  ): Promise<any>;
  getNumberBlock(ws: string): Promise<number>;
  getFromWei(balanceWei: string, ws: string): Promise<any>
  statusNode(ws: string): Promise<any>
}
