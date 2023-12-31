import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { IsGloovBalancePresenter, createAccountPresenter, transactionPresenter, transitTokensPresenter } from './gloov.presenter';
import { GetBalanceUseCases } from '../../../usecases/gloov/getBalance.usecases';
import { SendTransactinoDto } from './gloov.dto';
import { CreateAccountUseCases } from '../../../usecases/gloov/createAccount.usecases';
import { SendTransactionUseCases } from '../../../usecases/gloov/sendTransaction.usecases';
import { WithdrawalsUseCases } from '../../../usecases/gloov/withdrawals.usecases';
import { ReturnUserUseCases } from '../../../usecases/gloov/returnUser.usecases';
import { CashReturnUseCases } from '../../../usecases/gloov/cashReturn.usecases';
import { AddTokensUseCases } from '../../../usecases/gloov/addTokens.usecases';
import { AddTokensChargeBackUseCases } from '../../../usecases/gloov/addTokensChargeBack.usecases';
import { AddTokensBondsUseCases } from '../../../usecases/gloov/addTokensBonds.usecases';
import { AddBoundsUseCases } from '../../../usecases/gloov/addBounds.usecases';
import { TransitTokensUseCases } from '../../../usecases/gloov/transitTokens.usecases';
import { StatusBlockchainUseCases } from 'src/usecases/blockchain/statusBlockchain.usecases';
export declare class GloovController {
    private readonly getBalanceUsecaseProxy;
    private readonly createAccountUsecaseProxy;
    private readonly sendTransactiontUsecaseProxy;
    private readonly WithdrawalsUsecaseProxy;
    private readonly ReturnUserUsecaseProxy;
    private readonly cashReturnUsecaseProxy;
    private readonly addTokensUsecaseProxy;
    private readonly addTokensChargeBackUsecaseProxy;
    private readonly addTokensBondsUsecaseProxy;
    private readonly addBondsUsecaseProxy;
    private readonly transitTokensUsecaseProxy;
    private readonly statusUsecaseProxy;
    constructor(getBalanceUsecaseProxy: UseCaseProxy<GetBalanceUseCases>, createAccountUsecaseProxy: UseCaseProxy<CreateAccountUseCases>, sendTransactiontUsecaseProxy: UseCaseProxy<SendTransactionUseCases>, WithdrawalsUsecaseProxy: UseCaseProxy<WithdrawalsUseCases>, ReturnUserUsecaseProxy: UseCaseProxy<ReturnUserUseCases>, cashReturnUsecaseProxy: UseCaseProxy<CashReturnUseCases>, addTokensUsecaseProxy: UseCaseProxy<AddTokensUseCases>, addTokensChargeBackUsecaseProxy: UseCaseProxy<AddTokensChargeBackUseCases>, addTokensBondsUsecaseProxy: UseCaseProxy<AddTokensBondsUseCases>, addBondsUsecaseProxy: UseCaseProxy<AddBoundsUseCases>, transitTokensUsecaseProxy: UseCaseProxy<TransitTokensUseCases>, statusUsecaseProxy: UseCaseProxy<StatusBlockchainUseCases>);
    getBalance(account: string): Promise<IsGloovBalancePresenter>;
    createAccount(): Promise<createAccountPresenter>;
    transitTokens(publicKey: string): Promise<transitTokensPresenter>;
    sendTransaction(sendTransactinoDto: SendTransactinoDto): Promise<transactionPresenter>;
    withdrawals(sendTransactinoDto: SendTransactinoDto): Promise<transactionPresenter>;
    returnUser(sendTransactinoDto: SendTransactinoDto): Promise<transactionPresenter>;
    cashReturn(sendTransactinoDto: SendTransactinoDto): Promise<transactionPresenter>;
    addTokens(sendTransactinoDto: SendTransactinoDto): Promise<transactionPresenter>;
    addTokensChargeBack(sendTransactinoDto: SendTransactinoDto): Promise<transactionPresenter>;
    addTokensBonds(sendTransactinoDto: SendTransactinoDto): Promise<transactionPresenter>;
    addBonds(sendTransactinoDto: SendTransactinoDto): Promise<transactionPresenter>;
    status(): Promise<any>;
}
