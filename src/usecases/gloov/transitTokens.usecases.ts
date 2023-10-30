import { GloovConfig } from '../../domain/web3/gloov.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IBlockchainService } from '../../domain/adapters/blockchain.interface';
const BigNumber = require('bignumber.js');
import { BlockchainRepository } from '../../domain/repositories/blockchainRepository.interface';
import { AccountTransitDTO } from './dto/accountTransitDTO.dto';
import Decimal from 'decimal.js';
import { Big } from 'big.js';


export class TransitTokensUseCases {
  ws: string = this.gloovConfig.getWeb3Url();
  constructor(
    private readonly gloovConfig: GloovConfig,
    private readonly logger: ILogger,
    private readonly blockchainService: IBlockchainService,
    private readonly blockchainRepository: BlockchainRepository
  ) { }

  async execute(publicKey: string): Promise<any> {
    try {
      const values = new AccountTransitDTO(new BigNumber(0), new BigNumber(0), new BigNumber(0));

      //obtener los bloques actuales
      const toBlocks = BigNumber(await this.blockchainService.getNumberBlock(this.ws));
      const toBlock = new Big(toBlocks).plus(2);

      //obtener los 21 dias en bloques
      const days = Big(this.gloovConfig.getMaxBlocks()) * Big(17280);

      //restar los bloques actuales con los dias para generar los bloques
      const fBlock = toBlock.minus(days);

      //obtener la direccion de la billeter master y de bound
      const msAcc = await this.blockchainService.getAddressPublic(this.gloovConfig.getAccountMaster(), this.ws);
      const bAcc = await this.blockchainService.getAddressPublic(this.gloovConfig.getAccountBond(), this.ws);

      //obtener el balance de la address consultar o la actual
      const bal = await this.blockchainService.balances(publicKey, this.ws);

      //buscar todas las transacciones que estan entre fBlock y toBlock en la base de datos
      const txs = await this.blockchainRepository.findTransactionsBetweenBlock(fBlock, toBlock);

      //crear un hashMapara agregar el balance y la llave pueblica
      const balances = {};
      balances['key'] = publicKey;
      balances['value'] = bal;

      const response = await this.verifyTransaction(balances, values, publicKey, toBlock, fBlock, toBlock, msAcc, bAcc, bal, txs)
      values.total = bal;
      return response;
    } catch (error) {
      console.log(error)
    }

  }

  async verifyTransaction(balances: {}, values: AccountTransitDTO, toAddress: string, toBlock: any, fBlock: number, tBlock: number, msAccount: string, bAccount: string, prevTra: any, txs: any) {
    try {
      //obtener el balance del arreglo
      const bal = balances['value'];

      //crear funcion de process list
      const resp = await this.processList(null, toAddress, fBlock, toBlock, txs);
      const env = await this.processList(toAddress, null, fBlock, toBlock, txs);

      //crear la listo de total processlistor
      const total = await this.processListOr(toAddress, toAddress, fBlock, toBlock, txs);

      const valPreSend = await this.evalueList(env, tBlock);

      const value = await this.evalueList(resp, tBlock);

      const balDecimal = new Big(bal);
      const valPreSendDecimal = new Big(valPreSend);
      const valueDecimal = new Big(value);

      const sumPre = balDecimal.plus(valPreSendDecimal).minus(valueDecimal);
      const s = parseFloat(sumPre);
      const pr = parseFloat(prevTra);

      if (s >= (valPreSendDecimal + pr)) {
        values.available = new Big(values.available).plus(prevTra);
      } else {
        //vamos hacer el else dentro de este if
        values.available = sumPre;

        for (const item of total) {
          // Realiza operaciones con 'item'
          const valTra = await this.blockchainService.getFromWei(item.value, this.ws);

          if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === toAddress.toLowerCase()) {
            const val = parseFloat(values.available.toString());
            const valt = parseFloat(valTra);
            if (val >= valt) {
              values.available = new Big(values.available).minus(valTra);
            } else {
              const calc = new Big(valTra) - (values.available);
              values.transit = new Big(values.transit).minus(calc);
              values.available = new BigNumber(0);
            }
          } else {
            const valTemp = new AccountTransitDTO(new BigNumber(0), new BigNumber(0), new BigNumber(0));
            const txt = [];
            txs.forEach((element) => {
              if (element !== item) {
                txt.push(element);
              }
            });

            if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === bAccount.toLowerCase()) {
              values.available = new Big(values.available).plus(valTra);
            } else if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === msAccount.toLowerCase()) {
              values.transit = new Big(values.transit).plus(valTra);
            } else {
              const verifyTransaction2 = await this.verifyTransaction2(balances, valTemp, ("0x" + await this.bytesToHex(item.fromAddressHash)), toBlock, fBlock, item.blockNumber, msAccount, bAccount, valTra, txt, txs);
              values.transit = new Big(values.transit).plus(valTemp.transit);
              values.available = new Big(values.available).plus(valTemp.available);
            }

          }

        }
      }


      return values;
    } catch (error) {
      console.log(error)
    }

  }
  async verifyTransaction2(balances: {}, values: AccountTransitDTO, toAddress: string, toBlock: number, fBlock: number, tBlock: any, msAccount: string, bAccount: string, prevTra: any, txs: any[], totalTx: any) {
    let bal = balances[toAddress] !== undefined ? balances[toAddress] : await this.blockchainService.balances(toAddress, this.ws);

    const resp = await this.processList(null, toAddress, fBlock, toBlock, totalTx);

    const env = await this.processList(toAddress, null, fBlock, toBlock, totalTx);

    const total = await this.processListOr(toAddress, toAddress, fBlock, tBlock, txs);

    const valPreSend = await (this.evalueList(env, tBlock));

    const value = await this.evalueList(resp, tBlock);

    const valPreSend2 = new BigNumber(await this.evalueList2(env, tBlock));

    const value2 = new BigNumber(await this.evalueList2(resp, tBlock));
    const ball = bal - value2 + valPreSend2 - prevTra;

    const bal1 = new Big(bal); // Reemplaza con el valor de bal
    const value21 = new Big(value2); // Reemplaza con el valor de value2
    const valPreSend21 = new Big(valPreSend2); // Reemplaza con el valor de valPreSend2
    const prevTra1 = new Big(prevTra);

    const rest = bal1.minus(value21).plus(valPreSend21).minus(prevTra1);

    const sumPre = rest.plus(valPreSend).plus(prevTra1).minus(value);

    if (sumPre >= (valPreSend + prevTra1)) {
      values.available = new Big(values.available).plus(prevTra1);
      values.transit = 0;
    } else {

      values.available = sumPre;

      for (const item of total) {
        const valTra = await this.blockchainService.getFromWei(item.value, this.ws);

        //console.log("BAmos bien", valTra);
        if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === toAddress.toLowerCase()) {
          if (values.available >= valTra) {
            values.available = new Big(values.available).minus(valTra);
          } else {
            values.transit = new Big(values.transit).minus(valTra).minus(values.available);
            values.available = new BigNumber(0);
          }
        } else {
          const valTemp = new AccountTransitDTO(new BigNumber(0), new BigNumber(0), new BigNumber(0));

          const txt = [];
          txs.forEach((element) => {
            if (element !== item) {
              txt.push(element);
            }
          });

          if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === bAccount.toLowerCase()) {
            values.available = new Big(values.available).plus(valTra);
          } else if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === msAccount.toLowerCase()) {
            values.transit = new Big(values.transit).plus(valTra);
          } else {
            await this.verifyTransaction2(balances, valTemp, ("0x" + await this.bytesToHex(item.fromAddressHash)), toBlock, fBlock, item.blockNumber, msAccount, bAccount, valTra, txt, totalTx);
            values.transit = new Big(values.transit).plus(valTemp.transit);
            values.available = new Big(values.available).plus(valTemp.available);
          }
        }
      }

      const rest = new Big(values.available).minus(prevTra1);
      if (rest >= 0) {
        values.available = prevTra1;
        values.transit = 0
      } else {
        values.available = values.available;
        values.transit = new Big(prevTra1).minus(values.available);
      }
    }

  }

  async evalueList2(env: any, toBlock: number) {
    const valPreSend = env
      ? (async () => {
        const filteredTransactions = [];
        for (let i = 0; i < env.length; i++) {

          const transaction = env[i];
          if (transaction.type === 0 && transaction.blockNumber >= toBlock) {
            filteredTransactions.push(transaction.value);
          }
        }

        let sumaTotal = 0;

        for (const valor of filteredTransactions) {
          sumaTotal += parseFloat(valor);
        }
        const to = new Decimal(sumaTotal / 1000000000000000000);
        const t = new Decimal(to)
        return t;
      })()
      : new Decimal(0);

    const resolvedValue = await valPreSend;

    return resolvedValue;

  }

  async evalueList(env: any, toBlock: number) {

    const valPreSend = env
      ? (async () => {
        const filteredTransactions = [];
        for (let i = 0; i < env.length; i++) {
          const transaction = env[i];
          if (transaction.type === 0 && transaction.blockNumber < toBlock) {
            filteredTransactions.push(transaction.value);
          }
        }

        let sumaTotal = 0;

        for (const valor of filteredTransactions) {
          sumaTotal += parseFloat(valor);
        }
        const to = new Decimal(sumaTotal / 1000000000000000000);
        const t = new Decimal(to)

        return t;
      })()
      : new Decimal(0);

    const resolvedValue = await valPreSend;

    return resolvedValue;

  }

  async processList(from: string, to: string, fBlock: number, toBlock: number, resp: any): Promise<any> {

    const filteredTxs = [];

    for (const x of resp) {

      if (
        x.blockNumber <= toBlock &&
        x.blockNumber >= fBlock &&
        ("0x" + await this.bytesToHex(x.fromAddressHash)).toLowerCase() === (from !== null ? from : "0x" + await this.bytesToHex(x.fromAddressHash)).toLowerCase() &&
        ("0x" + await this.bytesToHex(x.toAddressHash)).toLowerCase() === (to !== null ? to : "0x" + await this.bytesToHex(x.toAddressHash)).toLowerCase()
      ) {
        filteredTxs.push(x);
      }
    }
    return filteredTxs;

  }



  async processListOr(from: string, to: string, fBlock: number, toBlock: any, txs: any) {

    const filteredTxs = [];

    for (const x of txs) {
      let fromAddress = "0x" + await this.bytesToHex(x.fromAddressHash);
      let toAddress = "0x" + await this.bytesToHex(x.toAddressHash);
      if (
        parseInt(x.blockNumber) <= toBlock &&
        parseInt(x.blockNumber) >= fBlock &&
        (fromAddress.toLowerCase() === (from ? from.toLowerCase() : fromAddress.toLowerCase()) ||
          toAddress.toLowerCase() === (to ? to.toLowerCase() : toAddress.toLowerCase()))
      ) {
        filteredTxs.push(x);
      }
    }
    return filteredTxs;
  }

  async bytesToHex(bytes) {
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, "0");
    }
    return hex;
  }

}