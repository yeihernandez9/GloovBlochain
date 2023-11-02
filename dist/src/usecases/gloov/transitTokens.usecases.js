"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitTokensUseCases = void 0;
const BigNumber = require('bignumber.js');
const accountTransitDTO_dto_1 = require("./dto/accountTransitDTO.dto");
const decimal_js_1 = require("decimal.js");
const big_js_1 = require("big.js");
class TransitTokensUseCases {
    constructor(gloovConfig, logger, blockchainService, blockchainRepository) {
        this.gloovConfig = gloovConfig;
        this.logger = logger;
        this.blockchainService = blockchainService;
        this.blockchainRepository = blockchainRepository;
        this.ws = this.gloovConfig.getWeb3Url();
    }
    async execute(publicKey) {
        try {
            const values = new accountTransitDTO_dto_1.AccountTransitDTO(new BigNumber(0), new BigNumber(0), new BigNumber(0));
            const toBlocks = BigNumber(await this.blockchainService.getNumberBlock(this.ws));
            const toBlock = new big_js_1.Big(toBlocks).plus(2);
            const days = big_js_1.Big(this.gloovConfig.getMaxBlocks()) * big_js_1.Big(17280);
            const fBlock = toBlock.minus(days);
            const msAcc = await this.blockchainService.getAddressPublic(this.gloovConfig.getAccountMaster(), this.ws);
            const bAcc = await this.blockchainService.getAddressPublic(this.gloovConfig.getAccountBond(), this.ws);
            const bal = await this.blockchainService.balances(publicKey, this.ws);
            const txs = await this.blockchainRepository.findTransactionsBetweenBlock(fBlock, toBlock);
            const balances = {};
            balances['key'] = publicKey;
            balances['value'] = bal;
            const response = await this.verifyTransaction(balances, values, publicKey, toBlock, fBlock, toBlock, msAcc, bAcc, bal, txs);
            values.total = bal;
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async verifyTransaction(balances, values, toAddress, toBlock, fBlock, tBlock, msAccount, bAccount, prevTra, txs) {
        try {
            const bal = balances['value'];
            const resp = await this.processList(null, toAddress, fBlock, toBlock, txs);
            const env = await this.processList(toAddress, null, fBlock, toBlock, txs);
            const total = await this.processListOr(toAddress, toAddress, fBlock, toBlock, txs);
            const valPreSend = await this.evalueList(env, tBlock);
            const value = await this.evalueList(resp, tBlock);
            const balDecimal = new big_js_1.Big(bal);
            const valPreSendDecimal = new big_js_1.Big(valPreSend);
            const valueDecimal = new big_js_1.Big(value);
            const sumPre = balDecimal.plus(valPreSendDecimal).minus(valueDecimal);
            const s = parseFloat(sumPre);
            const pr = parseFloat(prevTra);
            if (s >= (valPreSendDecimal + pr)) {
                values.available = new big_js_1.Big(values.available).plus(prevTra);
            }
            else {
                values.available = sumPre;
                for (const item of total) {
                    const valTra = await this.blockchainService.getFromWei(item.value, this.ws);
                    if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === toAddress.toLowerCase()) {
                        const val = parseFloat(values.available.toString());
                        const valt = parseFloat(valTra);
                        if (val >= valt) {
                            values.available = new big_js_1.Big(values.available).minus(valTra);
                        }
                        else {
                            const calc = new big_js_1.Big(valTra) - (values.available);
                            values.transit = new big_js_1.Big(values.transit).minus(calc);
                            values.available = new BigNumber(0);
                        }
                    }
                    else {
                        const valTemp = new accountTransitDTO_dto_1.AccountTransitDTO(new BigNumber(0), new BigNumber(0), new BigNumber(0));
                        const txt = [];
                        txs.forEach((element) => {
                            if (element !== item) {
                                txt.push(element);
                            }
                        });
                        if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === bAccount.toLowerCase()) {
                            values.available = new big_js_1.Big(values.available).plus(valTra);
                        }
                        else if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === msAccount.toLowerCase()) {
                            values.transit = new big_js_1.Big(values.transit).plus(valTra);
                        }
                        else {
                            const verifyTransaction2 = await this.verifyTransaction2(balances, valTemp, ("0x" + await this.bytesToHex(item.fromAddressHash)), toBlock, fBlock, item.blockNumber, msAccount, bAccount, valTra, txt, txs);
                            values.transit = new big_js_1.Big(values.transit).plus(valTemp.transit);
                            values.available = new big_js_1.Big(values.available).plus(valTemp.available);
                        }
                    }
                }
            }
            return values;
        }
        catch (error) {
            console.log(error);
        }
    }
    async verifyTransaction2(balances, values, toAddress, toBlock, fBlock, tBlock, msAccount, bAccount, prevTra, txs, totalTx) {
        let bal = balances[toAddress] !== undefined ? balances[toAddress] : await this.blockchainService.balances(toAddress, this.ws);
        const resp = await this.processList(null, toAddress, fBlock, toBlock, totalTx);
        const env = await this.processList(toAddress, null, fBlock, toBlock, totalTx);
        const total = await this.processListOr(toAddress, toAddress, fBlock, tBlock, txs);
        const valPreSend = await (this.evalueList(env, tBlock));
        const value = await this.evalueList(resp, tBlock);
        const valPreSend2 = new BigNumber(await this.evalueList2(env, tBlock));
        const value2 = new BigNumber(await this.evalueList2(resp, tBlock));
        const ball = bal - value2 + valPreSend2 - prevTra;
        const bal1 = new big_js_1.Big(bal);
        const value21 = new big_js_1.Big(value2);
        const valPreSend21 = new big_js_1.Big(valPreSend2);
        const prevTra1 = new big_js_1.Big(prevTra);
        const rest = bal1.minus(value21).plus(valPreSend21).minus(prevTra1);
        const sumPre = rest.plus(valPreSend).plus(prevTra1).minus(value);
        if (sumPre >= (valPreSend + prevTra1)) {
            values.available = new big_js_1.Big(values.available).plus(prevTra1);
            values.transit = 0;
        }
        else {
            values.available = sumPre;
            for (const item of total) {
                const valTra = await this.blockchainService.getFromWei(item.value, this.ws);
                if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === toAddress.toLowerCase()) {
                    if (values.available >= valTra) {
                        values.available = new big_js_1.Big(values.available).minus(valTra);
                    }
                    else {
                        values.transit = new big_js_1.Big(values.transit).minus(valTra).minus(values.available);
                        values.available = new BigNumber(0);
                    }
                }
                else {
                    const valTemp = new accountTransitDTO_dto_1.AccountTransitDTO(new BigNumber(0), new BigNumber(0), new BigNumber(0));
                    const txt = [];
                    txs.forEach((element) => {
                        if (element !== item) {
                            txt.push(element);
                        }
                    });
                    if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === bAccount.toLowerCase()) {
                        values.available = new big_js_1.Big(values.available).plus(valTra);
                    }
                    else if ("0x" + (await this.bytesToHex(item.fromAddressHash)).toLowerCase() === msAccount.toLowerCase()) {
                        values.transit = new big_js_1.Big(values.transit).plus(valTra);
                    }
                    else {
                        await this.verifyTransaction2(balances, valTemp, ("0x" + await this.bytesToHex(item.fromAddressHash)), toBlock, fBlock, item.blockNumber, msAccount, bAccount, valTra, txt, totalTx);
                        values.transit = new big_js_1.Big(values.transit).plus(valTemp.transit);
                        values.available = new big_js_1.Big(values.available).plus(valTemp.available);
                    }
                }
            }
            const rest = new big_js_1.Big(values.available).minus(prevTra1);
            if (rest >= 0) {
                values.available = prevTra1;
                values.transit = 0;
            }
            else {
                values.available = values.available;
                values.transit = new big_js_1.Big(prevTra1).minus(values.available);
            }
        }
    }
    async evalueList2(env, toBlock) {
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
                const to = new decimal_js_1.default(sumaTotal / 1000000000000000000);
                const t = new decimal_js_1.default(to);
                return t;
            })()
            : new decimal_js_1.default(0);
        const resolvedValue = await valPreSend;
        return resolvedValue;
    }
    async evalueList(env, toBlock) {
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
                const to = new decimal_js_1.default(sumaTotal / 1000000000000000000);
                const t = new decimal_js_1.default(to);
                return t;
            })()
            : new decimal_js_1.default(0);
        const resolvedValue = await valPreSend;
        return resolvedValue;
    }
    async processList(from, to, fBlock, toBlock, resp) {
        const filteredTxs = [];
        for (const x of resp) {
            if (x.blockNumber <= toBlock &&
                x.blockNumber >= fBlock &&
                ("0x" + await this.bytesToHex(x.fromAddressHash)).toLowerCase() === (from !== null ? from : "0x" + await this.bytesToHex(x.fromAddressHash)).toLowerCase() &&
                ("0x" + await this.bytesToHex(x.toAddressHash)).toLowerCase() === (to !== null ? to : "0x" + await this.bytesToHex(x.toAddressHash)).toLowerCase()) {
                filteredTxs.push(x);
            }
        }
        return filteredTxs;
    }
    async processListOr(from, to, fBlock, toBlock, txs) {
        const filteredTxs = [];
        for (const x of txs) {
            let fromAddress = "0x" + await this.bytesToHex(x.fromAddressHash);
            let toAddress = "0x" + await this.bytesToHex(x.toAddressHash);
            if (parseInt(x.blockNumber) <= toBlock &&
                parseInt(x.blockNumber) >= fBlock &&
                (fromAddress.toLowerCase() === (from ? from.toLowerCase() : fromAddress.toLowerCase()) ||
                    toAddress.toLowerCase() === (to ? to.toLowerCase() : toAddress.toLowerCase()))) {
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
exports.TransitTokensUseCases = TransitTokensUseCases;
//# sourceMappingURL=transitTokens.usecases.js.map