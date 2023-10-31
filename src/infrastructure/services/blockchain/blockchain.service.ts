import { HttpService, Injectable } from '@nestjs/common';
import { IBlockchainService } from '../../../domain/adapters/blockchain.interface';
const { Web3 } = require('web3');

@Injectable()
export class BlockchainService implements IBlockchainService {
  constructor(private httpService: HttpService) { }
  async getNumberBlock(ws: string): Promise<number> {
    const web3 = new Web3('http://' + ws);
    const block = await web3.eth.getBlockNumber();
    return block;
  }
  async transaction(
    address: string,
    nonce: string,
    to: string,
    value: string,
    gas: string,
    gasPrice: string,
    addressB: string,
    ws: string,
  ): Promise<any> {
    try {
      const web3 = new Web3('http://' + ws);
      const transaccionCruda = {
        nonce: nonce,
        from: address,
        to: to,
        value: value,
        gas: gas, // Gas limit
        gasPrice: web3.utils.toWei(gasPrice, 'gwei'), // Precio del gas en Wei (10 Gwei)
      };
      const transaccionFirmada = await web3.eth.accounts.signTransaction(transaccionCruda, addressB);

      // Enviar la transacción a la red Ethereum.
      const resultado = await web3.eth.sendSignedTransaction(transaccionFirmada.rawTransaction);
      return resultado;
    } catch (error) {
      console.log("EROR: en GET_FROM_WEI")
      return error;
    }
  }
  async getnonce(address: string, ws: string): Promise<any> {
    try {
      const web3 = new Web3('http://' + ws);
      const nonce = web3.eth.getTransactionCount(address);
      return nonce;
    } catch (error) {
      console.log("EROR: en GET_FROM_WEI")
      return error;
    }
  }
  async convertEtherToWei(value: number, ws: string): Promise<any> {
    try {
      const web3 = new Web3('http://' + ws);
      const wei = web3.utils.toWei(value, 'ether');
      return wei;
    } catch (error) {
      console.log("EROR: en GET_FROM_WEI")
      return error;
    }
  }
  async createAccount(ws: string): Promise<any> {
    try {
      const web3 = new Web3('http://' + ws);
      const account = web3.eth.accounts.create();
      return account;
    } catch (error) {
      console.log("EROR: en GET_FROM_WEI")
      return error;
    }
  }

  async getAddressPublic(privateKey: string, ws: string): Promise<string> {
    try {
      const web3 = new Web3('http://' + ws);
      const address = web3.eth.accounts.privateKeyToAccount(privateKey);
      return address.address;
    } catch (error) {
      console.log("EROR: en GET_FROM_WEI")
      return error;
    }
  }

  async balances(address: string, ws: string): Promise<number> {
    const web3 = new Web3('http://' + ws);
    try {
      const balanceWei = await web3.eth.getBalance(address, 'latest');
      const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
      return balanceEther;
    } catch (error) {
      console.log("EROR: en GET_FROM_WEI")
      return error;
    }
  }

  async getFromWei(balanceWei: string, ws: string): Promise<number> {
    let retryCount = 0;
    let balanceEther = null;
    const maxRetries = 3;
    const retryDelay = 1000

    while (retryCount < maxRetries) {
      try {
        const web3 = new Web3('http://' + ws);
        balanceEther = web3.utils.fromWei(balanceWei, 'ether');
        break; // Éxito, salir del bucle
      } catch (error) {
        console.error(`Error en el intento ${retryCount + 1}:`, error);
        retryCount++;

        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay)); // Esperar antes de reintentar
        } else {
          console.error("Número máximo de intentos alcanzado. No se puede completar la operación.");
        }
      }
    }

    return balanceEther;
  }

  async statusNode(ws: string): Promise<any> {
    const response = await this.httpService.get('http://' + ws + "/liveness").toPromise();
    return response.data;
  }
}
