"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UsecasesProxyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecasesProxyModule = void 0;
const common_1 = require("@nestjs/common");
const addTodo_usecases_1 = require("../../usecases/todo/addTodo.usecases");
const deleteTodo_usecases_1 = require("../../usecases/todo/deleteTodo.usecases");
const getTodo_usecases_1 = require("../../usecases/todo/getTodo.usecases");
const getTodos_usecases_1 = require("../../usecases/todo/getTodos.usecases");
const updateTodo_usecases_1 = require("../../usecases/todo/updateTodo.usecases");
const isAuthenticated_usecases_1 = require("../../usecases/auth/isAuthenticated.usecases");
const login_usecases_1 = require("../../usecases/auth/login.usecases");
const logout_usecases_1 = require("../../usecases/auth/logout.usecases");
const register_usecases_1 = require("../../usecases/auth/register.usecases");
const getBalance_usecases_1 = require("../../usecases/gloov/getBalance.usecases");
const exceptions_module_1 = require("../exceptions/exceptions.module");
const logger_module_1 = require("../logger/logger.module");
const logger_service_1 = require("../logger/logger.service");
const bcrypt_module_1 = require("../services/bcrypt/bcrypt.module");
const bcrypt_service_1 = require("../services/bcrypt/bcrypt.service");
const jwt_module_1 = require("../services/jwt/jwt.module");
const jwt_service_1 = require("../services/jwt/jwt.service");
const repositories_module_1 = require("../repositories/repositories.module");
const todo_repository_1 = require("../repositories/todo.repository");
const user_repository_1 = require("../repositories/user.repository");
const blockchain_repository_1 = require("../repositories/blockchain.repository");
const environment_config_module_1 = require("../config/environment-config/environment-config.module");
const environment_config_service_1 = require("../config/environment-config/environment-config.service");
const usecases_proxy_1 = require("./usecases-proxy");
const createAccount_usecases_1 = require("../../usecases/gloov/createAccount.usecases");
const sendTransaction_usecases_1 = require("../../usecases/gloov/sendTransaction.usecases");
const blockchain_service_1 = require("../services/blockchain/blockchain.service");
const blockchain_module_1 = require("../services/blockchain/blockchain.module");
const withdrawals_usecases_1 = require("../../usecases/gloov/withdrawals.usecases");
const returnUser_usecases_1 = require("../../usecases/gloov/returnUser.usecases");
const cashReturn_usecases_1 = require("../../usecases/gloov/cashReturn.usecases");
const addTokens_usecases_1 = require("../../usecases/gloov/addTokens.usecases");
const addTokensChargeBack_usecases_1 = require("../../usecases/gloov/addTokensChargeBack.usecases");
const addTokensBonds_usecases_1 = require("../../usecases/gloov/addTokensBonds.usecases");
const addBounds_usecases_1 = require("../../usecases/gloov/addBounds.usecases");
const transitTokens_usecases_1 = require("../../usecases/gloov/transitTokens.usecases");
let UsecasesProxyModule = UsecasesProxyModule_1 = class UsecasesProxyModule {
    static register() {
        return {
            module: UsecasesProxyModule_1,
            providers: [
                {
                    inject: [logger_service_1.LoggerService, jwt_service_1.JwtTokenService, environment_config_service_1.EnvironmentConfigService, user_repository_1.DatabaseUserRepository, bcrypt_service_1.BcryptService],
                    provide: UsecasesProxyModule_1.LOGIN_USECASES_PROXY,
                    useFactory: (logger, jwtTokenService, config, userRepo, bcryptService) => new usecases_proxy_1.UseCaseProxy(new login_usecases_1.LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
                },
                {
                    inject: [user_repository_1.DatabaseUserRepository],
                    provide: UsecasesProxyModule_1.IS_AUTHENTICATED_USECASES_PROXY,
                    useFactory: (userRepo) => new usecases_proxy_1.UseCaseProxy(new isAuthenticated_usecases_1.IsAuthenticatedUseCases(userRepo)),
                },
                {
                    inject: [],
                    provide: UsecasesProxyModule_1.LOGOUT_USECASES_PROXY,
                    useFactory: () => new usecases_proxy_1.UseCaseProxy(new logout_usecases_1.LogoutUseCases()),
                },
                {
                    inject: [logger_service_1.LoggerService, user_repository_1.DatabaseUserRepository, bcrypt_service_1.BcryptService],
                    provide: UsecasesProxyModule_1.REGISTER_USECASES_PROXY,
                    useFactory: (logger, userRepo, bcryptService) => new usecases_proxy_1.UseCaseProxy(new register_usecases_1.registerUseCases(logger, userRepo, bcryptService)),
                },
                {
                    inject: [todo_repository_1.DatabaseTodoRepository],
                    provide: UsecasesProxyModule_1.GET_TODO_USECASES_PROXY,
                    useFactory: (todoRepository) => new usecases_proxy_1.UseCaseProxy(new getTodo_usecases_1.GetTodoUseCases(todoRepository)),
                },
                {
                    inject: [todo_repository_1.DatabaseTodoRepository],
                    provide: UsecasesProxyModule_1.GET_TODOS_USECASES_PROXY,
                    useFactory: (todoRepository) => new usecases_proxy_1.UseCaseProxy(new getTodos_usecases_1.getTodosUseCases(todoRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, todo_repository_1.DatabaseTodoRepository],
                    provide: UsecasesProxyModule_1.POST_TODO_USECASES_PROXY,
                    useFactory: (logger, todoRepository) => new usecases_proxy_1.UseCaseProxy(new addTodo_usecases_1.addTodoUseCases(logger, todoRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, todo_repository_1.DatabaseTodoRepository],
                    provide: UsecasesProxyModule_1.PUT_TODO_USECASES_PROXY,
                    useFactory: (logger, todoRepository) => new usecases_proxy_1.UseCaseProxy(new updateTodo_usecases_1.updateTodoUseCases(logger, todoRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, todo_repository_1.DatabaseTodoRepository],
                    provide: UsecasesProxyModule_1.DELETE_TODO_USECASES_PROXY,
                    useFactory: (logger, todoRepository) => new usecases_proxy_1.UseCaseProxy(new deleteTodo_usecases_1.deleteTodoUseCases(logger, todoRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.GET_BALANCE,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new getBalance_usecases_1.GetBalanceUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.CREATE_ACCOUNT,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new createAccount_usecases_1.CreateAccountUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.SEND_TRANSACTION,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new sendTransaction_usecases_1.SendTransactionUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.WITHDRAWALS,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new withdrawals_usecases_1.WithdrawalsUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.RETURN_USER,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new returnUser_usecases_1.ReturnUserUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.CASH_RETURN,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new cashReturn_usecases_1.CashReturnUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.ADD_TOKENS,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new addTokens_usecases_1.AddTokensUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.ADD_TOKENS_CHARGE_BACK,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new addTokensChargeBack_usecases_1.AddTokensChargeBackUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.ADD_TOKENS_BONDS,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new addTokensBonds_usecases_1.AddTokensBondsUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService],
                    provide: UsecasesProxyModule_1.ADD_BONDS,
                    useFactory: (logger, config, blockchainService) => new usecases_proxy_1.UseCaseProxy(new addBounds_usecases_1.AddBoundsUseCases(config, logger, blockchainService)),
                },
                {
                    inject: [logger_service_1.LoggerService, environment_config_service_1.EnvironmentConfigService, blockchain_service_1.BlockchainService, blockchain_repository_1.DatabaseBlockchainRepository],
                    provide: UsecasesProxyModule_1.TRANSIT_TOKENS,
                    useFactory: (logger, config, blockchainService, blockchainRepo) => new usecases_proxy_1.UseCaseProxy(new transitTokens_usecases_1.TransitTokensUseCases(config, logger, blockchainService, blockchainRepo)),
                },
            ],
            exports: [
                UsecasesProxyModule_1.GET_TODO_USECASES_PROXY,
                UsecasesProxyModule_1.GET_TODOS_USECASES_PROXY,
                UsecasesProxyModule_1.POST_TODO_USECASES_PROXY,
                UsecasesProxyModule_1.PUT_TODO_USECASES_PROXY,
                UsecasesProxyModule_1.DELETE_TODO_USECASES_PROXY,
                UsecasesProxyModule_1.LOGIN_USECASES_PROXY,
                UsecasesProxyModule_1.IS_AUTHENTICATED_USECASES_PROXY,
                UsecasesProxyModule_1.LOGOUT_USECASES_PROXY,
                UsecasesProxyModule_1.REGISTER_USECASES_PROXY,
                UsecasesProxyModule_1.GET_BALANCE,
                UsecasesProxyModule_1.CREATE_ACCOUNT,
                UsecasesProxyModule_1.SEND_TRANSACTION,
                UsecasesProxyModule_1.WITHDRAWALS,
                UsecasesProxyModule_1.RETURN_USER,
                UsecasesProxyModule_1.CASH_RETURN,
                UsecasesProxyModule_1.ADD_TOKENS,
                UsecasesProxyModule_1.ADD_TOKENS_CHARGE_BACK,
                UsecasesProxyModule_1.ADD_TOKENS_BONDS,
                UsecasesProxyModule_1.ADD_BONDS,
                UsecasesProxyModule_1.TRANSIT_TOKENS
            ],
        };
    }
};
UsecasesProxyModule.LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
UsecasesProxyModule.LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
UsecasesProxyModule.REGISTER_USECASES_PROXY = 'RegisterUseCaseProxy';
UsecasesProxyModule.GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
UsecasesProxyModule.GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
UsecasesProxyModule.POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
UsecasesProxyModule.DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
UsecasesProxyModule.PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';
UsecasesProxyModule.GET_BALANCE = 'getBalanceUseCasesProxy';
UsecasesProxyModule.CREATE_ACCOUNT = 'createAccountUseCasesProxy';
UsecasesProxyModule.SEND_TRANSACTION = 'sendTransactionCasesProxy';
UsecasesProxyModule.WITHDRAWALS = 'withdrawalsCasesProxy';
UsecasesProxyModule.RETURN_USER = 'returnUserCasesProxy';
UsecasesProxyModule.CASH_RETURN = 'cashReturnCasesProxy';
UsecasesProxyModule.ADD_TOKENS = 'addTokensCasesProxy';
UsecasesProxyModule.ADD_TOKENS_CHARGE_BACK = 'addTokensChargeBackCasesProxy';
UsecasesProxyModule.ADD_TOKENS_BONDS = 'addTokensBondsCasesProxy';
UsecasesProxyModule.ADD_BONDS = 'addBondsCasesProxy';
UsecasesProxyModule.TRANSIT_TOKENS = 'transitTokensCasesProxy';
UsecasesProxyModule = UsecasesProxyModule_1 = __decorate([
    common_1.Module({
        imports: [
            logger_module_1.LoggerModule,
            jwt_module_1.JwtModule,
            bcrypt_module_1.BcryptModule,
            environment_config_module_1.EnvironmentConfigModule,
            repositories_module_1.RepositoriesModule,
            exceptions_module_1.ExceptionsModule,
            blockchain_module_1.BlockchainModule,
        ],
    })
], UsecasesProxyModule);
exports.UsecasesProxyModule = UsecasesProxyModule;
//# sourceMappingURL=usecases-proxy.module.js.map