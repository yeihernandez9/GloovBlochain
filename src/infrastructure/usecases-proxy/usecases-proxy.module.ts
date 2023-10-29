import { DynamicModule, Module } from '@nestjs/common';
import { addTodoUseCases } from '../../usecases/todo/addTodo.usecases';
import { deleteTodoUseCases } from '../../usecases/todo/deleteTodo.usecases';
import { GetTodoUseCases } from '../../usecases/todo/getTodo.usecases';
import { getTodosUseCases } from '../../usecases/todo/getTodos.usecases';
import { updateTodoUseCases } from '../../usecases/todo/updateTodo.usecases';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';
import { registerUseCases } from '../../usecases/auth/register.usecases';
import { GetBalanceUseCases } from '../../usecases/gloov/getBalance.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseTodoRepository } from '../repositories/todo.repository';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { DatabaseBlockchainRepository } from '../repositories/blockchain.repository'

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { CreateAccountUseCases } from 'src/usecases/gloov/createAccount.usecases';
import { SendTransactionUseCases } from 'src/usecases/gloov/sendTransaction.usecases';
import { BlockchainService } from '../services/blockchain/blockchain.service';
import { BlockchainModule } from '../services/blockchain/blockchain.module';
import { WithdrawalsUseCases } from '../../usecases/gloov/withdrawals.usecases';
import { ReturnUserUseCases } from '../../usecases/gloov/returnUser.usecases';
import { CashReturnUseCases } from '../../usecases/gloov/cashReturn.usecases';
import { AddTokensUseCases } from '../../usecases/gloov/addTokens.usecases';
import { AddTokensChargeBackUseCases } from '../../usecases/gloov/addTokensChargeBack.usecases';
import { AddTokensBondsUseCases } from '../../usecases/gloov/addTokensBonds.usecases';
import { AddBoundsUseCases } from '../../usecases/gloov/addBounds.usecases';
import { TransitTokensUseCases } from '../../usecases/gloov/transitTokens.usecases';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
    BlockchainModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  static REGISTER_USECASES_PROXY = 'RegisterUseCaseProxy';

  //Todo
  static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
  static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';

  //Gloov Blockchaion
  static GET_BALANCE = 'getBalanceUseCasesProxy';
  static CREATE_ACCOUNT = 'createAccountUseCasesProxy';
  static SEND_TRANSACTION = 'sendTransactionCasesProxy';
  static WITHDRAWALS = 'withdrawalsCasesProxy';
  static RETURN_USER = 'returnUserCasesProxy';
  static CASH_RETURN = 'cashReturnCasesProxy';
  static ADD_TOKENS = 'addTokensCasesProxy';
  static ADD_TOKENS_CHARGE_BACK = 'addTokensChargeBackCasesProxy';
  static ADD_TOKENS_BONDS = 'addTokensBondsCasesProxy';
  static ADD_BONDS = 'addBondsCasesProxy';
  static TRANSIT_TOKENS = 'transitTokensCasesProxy'

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (logger: LoggerService, userRepo: DatabaseUserRepository, bcryptService: BcryptService) =>
            new UseCaseProxy(new registerUseCases(logger, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new getTodosUseCases(todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new addTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new updateTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new deleteTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.GET_BALANCE,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new GetBalanceUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.CREATE_ACCOUNT,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new CreateAccountUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.SEND_TRANSACTION,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new SendTransactionUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.WITHDRAWALS,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new WithdrawalsUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.RETURN_USER,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new ReturnUserUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.CASH_RETURN,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new CashReturnUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.ADD_TOKENS,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new AddTokensUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.ADD_TOKENS_CHARGE_BACK,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new AddTokensChargeBackUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.ADD_TOKENS_BONDS,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new AddTokensBondsUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService],
          provide: UsecasesProxyModule.ADD_BONDS,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService) =>
            new UseCaseProxy(new AddBoundsUseCases(config, logger, blockchainService)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, BlockchainService, DatabaseBlockchainRepository],
          provide: UsecasesProxyModule.TRANSIT_TOKENS,
          useFactory: (logger: LoggerService, config: EnvironmentConfigService, blockchainService: BlockchainService, blockchainRepo: DatabaseBlockchainRepository) =>
            new UseCaseProxy(new TransitTokensUseCases(config, logger, blockchainService, blockchainRepo)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_TODO_USECASES_PROXY,
        UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
        UsecasesProxyModule.POST_TODO_USECASES_PROXY,
        UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
        UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.REGISTER_USECASES_PROXY,
        UsecasesProxyModule.GET_BALANCE,
        UsecasesProxyModule.CREATE_ACCOUNT,
        UsecasesProxyModule.SEND_TRANSACTION,
        UsecasesProxyModule.WITHDRAWALS,
        UsecasesProxyModule.RETURN_USER,
        UsecasesProxyModule.CASH_RETURN,
        UsecasesProxyModule.ADD_TOKENS,
        UsecasesProxyModule.ADD_TOKENS_CHARGE_BACK,
        UsecasesProxyModule.ADD_TOKENS_BONDS,
        UsecasesProxyModule.ADD_BONDS,
        UsecasesProxyModule.TRANSIT_TOKENS
      ],
    };
  }
}
