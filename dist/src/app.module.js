"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const logger_module_1 = require("./infrastructure/logger/logger.module");
const exceptions_module_1 = require("./infrastructure/exceptions/exceptions.module");
const usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/usecases-proxy.module");
const controllers_module_1 = require("./infrastructure/controllers/controllers.module");
const bcrypt_module_1 = require("./infrastructure/services/bcrypt/bcrypt.module");
const jwt_module_1 = require("./infrastructure/services/jwt/jwt.module");
const environment_config_module_1 = require("./infrastructure/config/environment-config/environment-config.module");
const local_strategy_1 = require("./infrastructure/common/strategies/local.strategy");
const jwt_strategy_1 = require("./infrastructure/common/strategies/jwt.strategy");
const jwtRefresh_strategy_1 = require("./infrastructure/common/strategies/jwtRefresh.strategy");
const blockchain_module_1 = require("./infrastructure/services/blockchain/blockchain.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.secret,
            }),
            logger_module_1.LoggerModule,
            exceptions_module_1.ExceptionsModule,
            usecases_proxy_module_1.UsecasesProxyModule.register(),
            controllers_module_1.ControllersModule,
            bcrypt_module_1.BcryptModule,
            jwt_module_1.JwtModule,
            environment_config_module_1.EnvironmentConfigModule,
            blockchain_module_1.BlockchainModule,
        ],
        providers: [local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, jwtRefresh_strategy_1.JwtRefreshTokenStrategy],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map