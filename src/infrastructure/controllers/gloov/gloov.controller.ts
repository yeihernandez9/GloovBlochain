import { Withdrawals } from './../../../../node_modules/web3-types/lib/commonjs/eth_types.d';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { IsGloovBalancePresenter, createAccountPresenter, transactionPresenter, transitTokensPresenter } from './gloov.presenter';
import { GetBalanceUseCases } from '../../../usecases/gloov/getBalance.usecases';
import { ApiResponseType } from '../../../infrastructure/common/swagger/response.decorator';
import { GetBalanceDto, SendTransactinoDto } from './gloov.dto';
import { CreateAccountUseCases } from '../../../usecases/gloov/createAccount.usecases';
import { JwtAuthGuard } from '../../../infrastructure/common/guards/jwtAuth.guard';
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
import { ApiResponsegType } from 'src/infrastructure/common/swagger/responseg.decorators';

@Controller()
@ApiTags('Blockchain')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsGloovBalancePresenter)
export class GloovController {
  constructor(
    @Inject(UsecasesProxyModule.GET_BALANCE)
    private readonly getBalanceUsecaseProxy: UseCaseProxy<GetBalanceUseCases>,
    @Inject(UsecasesProxyModule.CREATE_ACCOUNT)
    private readonly createAccountUsecaseProxy: UseCaseProxy<CreateAccountUseCases>,
    @Inject(UsecasesProxyModule.SEND_TRANSACTION)
    private readonly sendTransactiontUsecaseProxy: UseCaseProxy<SendTransactionUseCases>,
    @Inject(UsecasesProxyModule.WITHDRAWALS)
    private readonly WithdrawalsUsecaseProxy: UseCaseProxy<WithdrawalsUseCases>,
    @Inject(UsecasesProxyModule.RETURN_USER)
    private readonly ReturnUserUsecaseProxy: UseCaseProxy<ReturnUserUseCases>,
    @Inject(UsecasesProxyModule.CASH_RETURN)
    private readonly cashReturnUsecaseProxy: UseCaseProxy<CashReturnUseCases>,
    @Inject(UsecasesProxyModule.ADD_TOKENS)
    private readonly addTokensUsecaseProxy: UseCaseProxy<AddTokensUseCases>,
    @Inject(UsecasesProxyModule.ADD_TOKENS_CHARGE_BACK)
    private readonly addTokensChargeBackUsecaseProxy: UseCaseProxy<AddTokensChargeBackUseCases>,
    @Inject(UsecasesProxyModule.ADD_TOKENS_BONDS)
    private readonly addTokensBondsUsecaseProxy: UseCaseProxy<AddTokensBondsUseCases>,
    @Inject(UsecasesProxyModule.ADD_BONDS)
    private readonly addBondsUsecaseProxy: UseCaseProxy<AddBoundsUseCases>,
    @Inject(UsecasesProxyModule.TRANSIT_TOKENS)
    private readonly transitTokensUsecaseProxy: UseCaseProxy<TransitTokensUseCases>,
    @Inject(UsecasesProxyModule.STATUS)
    private readonly statusUsecaseProxy: UseCaseProxy<StatusBlockchainUseCases>
  ) { }

  @Get('account/balance/')
  //@ApiBearerAuth() 
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio retorna el balance de monedas que tiene un usuario en la aplicación.' })
  @ApiResponsegType(IsGloovBalancePresenter, true)
  async getBalance(@Query('account') account: string) {
    const balance = await this.getBalanceUsecaseProxy.getInstance().execute(account);
    const response = new IsGloovBalancePresenter();
    response.balance = balance;
    return balance;
  }

  @Get('account/createAccount')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio retorna las llaves pública y privada de un usuario recien creado.' })
  @ApiResponseType(createAccountPresenter, false)
  async createAccount() {
    const account = await this.createAccountUsecaseProxy.getInstance().execute();
    console.log(account)
    const response = new createAccountPresenter();
    response.publicKey = account.address;
    response.privateKey = account.privateKey;
    return response;
  }


  @Get('account/transitTokens')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiResponseType(transitTokensPresenter, false)
  @ApiOperation({ description: 'Este servicio realiza la consulta del saldo en transito para retiro.' })
  async transitTokens(@Query('publicKey') publicKey: string) {
    const account = await this.transitTokensUsecaseProxy.getInstance().execute(publicKey);
    const response = new transitTokensPresenter();
    response.available = account.available.toFixed(2);
    response.transit = account.transit.toFixed(2);
    response.total = account.total
    return response;
  }


  @Post('blockchain/sendTransaction')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio realiza la transferencia de monedas entre cuentas. El Body requiere todos los parámetros' })
  @HttpCode(200)
  @ApiResponseType(transactionPresenter, false)
  async sendTransaction(@Body() sendTransactinoDto: SendTransactinoDto) {
    const { pkOrigin, accDestiny, value } = sendTransactinoDto;
    const transaction = await this.sendTransactiontUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
    const response = new transactionPresenter();
    response.txHash = transaction;
    return response;
  }

  @Post('blockchain/withdrawals')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio realiza el retiro de dinero de la cuenta. El Body requiere "pkOrigin" y "value".' })
  @HttpCode(200)
  @ApiResponseType(transactionPresenter, false)
  async withdrawals(@Body() sendTransactinoDto: SendTransactinoDto) {
    const { pkOrigin, accDestiny, value } = sendTransactinoDto;
    const transaction = await this.WithdrawalsUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
    const response = new transactionPresenter();
    response.txHash = transaction;
    return response;
  }

  @Post('blockchain/returnUser')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio realiza para la adición de monedas a la cuenta de usuario desde la cuenta Return. El Body requiere "accDestiny" y "value".' })
  @HttpCode(200)
  @ApiResponseType(transactionPresenter, false)
  async returnUser(@Body() sendTransactinoDto: SendTransactinoDto) {
    const { pkOrigin, accDestiny, value } = sendTransactinoDto;
    const transaction = await this.ReturnUserUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
    const response = new transactionPresenter();
    response.txHash = transaction;
    return response;
  }

  @Post('blockchain/cashReturn')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio realiza para la adición de monedas en la cuenta Return desde la cuenta Cash. El Body requiere "value".' })
  @HttpCode(200)
  @ApiResponseType(transactionPresenter, false)
  async cashReturn(@Body() sendTransactinoDto: SendTransactinoDto) {
    const { pkOrigin, accDestiny, value } = sendTransactinoDto;
    const transaction = await this.cashReturnUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
    const response = new transactionPresenter();
    response.txHash = transaction;
    return response;
  }

  @Post('blockchain/addTokens')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio realiza la carga de monedas a un usuario en especifico. El Body requiere "accDestiny" y "value".' })
  @HttpCode(200)
  @ApiResponseType(transactionPresenter, false)
  async addTokens(@Body() sendTransactinoDto: SendTransactinoDto) {
    const { pkOrigin, accDestiny, value } = sendTransactinoDto;
    const transaction = await this.addTokensUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
    const response = new transactionPresenter();
    response.txHash = transaction;
    return response;
  }

  @Post('blockchain/addTokensChargeBack')
  //@ApiBearerAuth()
  ///\@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio realiza para la adición de monedas en la cuenta charge back. El Body requiere "pkOrigin" y "value".' })
  @HttpCode(200)
  @ApiResponseType(transactionPresenter, false)
  async addTokensChargeBack(@Body() sendTransactinoDto: SendTransactinoDto) {
    const { pkOrigin, accDestiny, value } = sendTransactinoDto;
    const transaction = await this.addTokensChargeBackUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
    const response = new transactionPresenter();
    response.txHash = transaction;
    return response;
  }

  @Post('blockchain/addTokensBonds')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio realiza para la adición de monedas en la cuenta de bonos. El Body requiere "value".' })
  @HttpCode(200)
  @ApiResponseType(transactionPresenter, false)
  async addTokensBonds(@Body() sendTransactinoDto: SendTransactinoDto) {
    const { pkOrigin, accDestiny, value } = sendTransactinoDto;
    const transaction = await this.addTokensBondsUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
    const response = new transactionPresenter();
    response.txHash = transaction;
    return response;
  }

  @Post('blockchain/addBonds')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio realiza la carga de bonos a un usuario en especifico. El Body requiere "accDestiny" y "value".' })
  @HttpCode(200)
  @ApiResponseType(transactionPresenter, false)
  async addBonds(@Body() sendTransactinoDto: SendTransactinoDto) {
    const { pkOrigin, accDestiny, value } = sendTransactinoDto;
    const transaction = await this.addBondsUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
    const response = new transactionPresenter();
    response.txHash = transaction;
    return response;
  }

  @Get('blockchain/livess')
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Este servicio retorna el estado de la blockchain.' })
  async status() {
    const status = await this.statusUsecaseProxy.getInstance().execute();
    return status;
  }
}
