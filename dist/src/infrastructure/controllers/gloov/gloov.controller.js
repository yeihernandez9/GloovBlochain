"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GloovController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usecases_proxy_1 = require("../../usecases-proxy/usecases-proxy");
const usecases_proxy_module_1 = require("../../usecases-proxy/usecases-proxy.module");
const gloov_presenter_1 = require("./gloov.presenter");
const response_decorator_1 = require("../../../infrastructure/common/swagger/response.decorator");
const gloov_dto_1 = require("./gloov.dto");
let GloovController = class GloovController {
    constructor(getBalanceUsecaseProxy, createAccountUsecaseProxy, sendTransactiontUsecaseProxy, WithdrawalsUsecaseProxy, ReturnUserUsecaseProxy, cashReturnUsecaseProxy, addTokensUsecaseProxy, addTokensChargeBackUsecaseProxy, addTokensBondsUsecaseProxy, addBondsUsecaseProxy, transitTokensUsecaseProxy) {
        this.getBalanceUsecaseProxy = getBalanceUsecaseProxy;
        this.createAccountUsecaseProxy = createAccountUsecaseProxy;
        this.sendTransactiontUsecaseProxy = sendTransactiontUsecaseProxy;
        this.WithdrawalsUsecaseProxy = WithdrawalsUsecaseProxy;
        this.ReturnUserUsecaseProxy = ReturnUserUsecaseProxy;
        this.cashReturnUsecaseProxy = cashReturnUsecaseProxy;
        this.addTokensUsecaseProxy = addTokensUsecaseProxy;
        this.addTokensChargeBackUsecaseProxy = addTokensChargeBackUsecaseProxy;
        this.addTokensBondsUsecaseProxy = addTokensBondsUsecaseProxy;
        this.addBondsUsecaseProxy = addBondsUsecaseProxy;
        this.transitTokensUsecaseProxy = transitTokensUsecaseProxy;
    }
    async getBalance(address) {
        const balance = await this.getBalanceUsecaseProxy.getInstance().execute(address);
        const response = new gloov_presenter_1.IsGloovBalancePresenter();
        response.balance = balance;
        return response;
    }
    async createAccount() {
        const account = await this.createAccountUsecaseProxy.getInstance().execute();
        const response = new gloov_presenter_1.createAccountPresenter();
        response.address = account.address;
        response.privateKey = account.privateKey;
        return response;
    }
    async transitTokens(address) {
        const account = await this.transitTokensUsecaseProxy.getInstance().execute(address);
        const response = new gloov_presenter_1.transitTokensPresenter();
        response.available = account.available.toFixed(2);
        response.transit = account.transit.toFixed(2);
        response.total = account.total;
        return response;
    }
    async sendTransaction(sendTransactinoDto) {
        const { pkOrigin, accDestiny, value } = sendTransactinoDto;
        const transaction = await this.sendTransactiontUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
        const response = new gloov_presenter_1.transactionPresenter();
        response.txHash = transaction;
        return response;
    }
    async withdrawals(sendTransactinoDto) {
        const { pkOrigin, accDestiny, value } = sendTransactinoDto;
        const transaction = await this.WithdrawalsUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
        const response = new gloov_presenter_1.transactionPresenter();
        response.txHash = transaction;
        return response;
    }
    async returnUser(sendTransactinoDto) {
        const { pkOrigin, accDestiny, value } = sendTransactinoDto;
        const transaction = await this.ReturnUserUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
        const response = new gloov_presenter_1.transactionPresenter();
        response.txHash = transaction;
        return response;
    }
    async cashReturn(sendTransactinoDto) {
        const { pkOrigin, accDestiny, value } = sendTransactinoDto;
        const transaction = await this.cashReturnUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
        const response = new gloov_presenter_1.transactionPresenter();
        response.txHash = transaction;
        return response;
    }
    async addTokens(sendTransactinoDto) {
        const { pkOrigin, accDestiny, value } = sendTransactinoDto;
        const transaction = await this.addTokensUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
        const response = new gloov_presenter_1.transactionPresenter();
        response.txHash = transaction;
        return response;
    }
    async addTokensChargeBack(sendTransactinoDto) {
        const { pkOrigin, accDestiny, value } = sendTransactinoDto;
        const transaction = await this.addTokensChargeBackUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
        const response = new gloov_presenter_1.transactionPresenter();
        response.txHash = transaction;
        return response;
    }
    async addTokensBonds(sendTransactinoDto) {
        const { pkOrigin, accDestiny, value } = sendTransactinoDto;
        const transaction = await this.addTokensBondsUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
        const response = new gloov_presenter_1.transactionPresenter();
        response.txHash = transaction;
        return response;
    }
    async addBonds(sendTransactinoDto) {
        const { pkOrigin, accDestiny, value } = sendTransactinoDto;
        const transaction = await this.addBondsUsecaseProxy.getInstance().execute(pkOrigin, accDestiny, value);
        const response = new gloov_presenter_1.transactionPresenter();
        response.txHash = transaction;
        return response;
    }
};
__decorate([
    common_1.Get('getBalance/:address'),
    swagger_1.ApiOperation({ description: 'Este servicio retorna el balance de monedas que tiene un usuario en la aplicación.' }),
    response_decorator_1.ApiResponseType(gloov_presenter_1.IsGloovBalancePresenter, false),
    __param(0, common_1.Param('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "getBalance", null);
__decorate([
    common_1.Get('createAccount'),
    swagger_1.ApiOperation({ description: 'Este servicio retorna las llaves pública y privada de un usuario recien creado.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "createAccount", null);
__decorate([
    common_1.Get('transitTokens/:address'),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transitTokensPresenter, false),
    swagger_1.ApiOperation({ description: 'Este servicio realiza la consulta del saldo en transito para retiro.' }),
    __param(0, common_1.Param('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "transitTokens", null);
__decorate([
    common_1.Post('sendTransaction'),
    swagger_1.ApiOperation({ description: 'Este servicio realiza la transferencia de monedas entre cuentas. El Body requiere todos los parámetros' }),
    common_1.HttpCode(200),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transactionPresenter, false),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gloov_dto_1.SendTransactinoDto]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "sendTransaction", null);
__decorate([
    common_1.Post('withdrawals'),
    swagger_1.ApiOperation({ description: 'Este servicio realiza el retiro de dinero de la cuenta. El Body requiere "pkOrigin" y "value".' }),
    common_1.HttpCode(200),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transactionPresenter, false),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gloov_dto_1.SendTransactinoDto]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "withdrawals", null);
__decorate([
    common_1.Post('returnUser'),
    swagger_1.ApiOperation({ description: 'Este servicio realiza para la adición de monedas a la cuenta de usuario desde la cuenta Return. El Body requiere "accDestiny" y "value".' }),
    common_1.HttpCode(200),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transactionPresenter, false),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gloov_dto_1.SendTransactinoDto]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "returnUser", null);
__decorate([
    common_1.Post('cashReturn'),
    swagger_1.ApiOperation({ description: 'Este servicio realiza para la adición de monedas en la cuenta Return desde la cuenta Cash. El Body requiere "value".' }),
    common_1.HttpCode(200),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transactionPresenter, false),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gloov_dto_1.SendTransactinoDto]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "cashReturn", null);
__decorate([
    common_1.Post('addTokens'),
    swagger_1.ApiOperation({ description: 'Este servicio realiza la carga de monedas a un usuario en especifico. El Body requiere "accDestiny" y "value".' }),
    common_1.HttpCode(200),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transactionPresenter, false),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gloov_dto_1.SendTransactinoDto]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "addTokens", null);
__decorate([
    common_1.Post('addTokensChargeBack'),
    swagger_1.ApiOperation({ description: 'Este servicio realiza para la adición de monedas en la cuenta charge back. El Body requiere "pkOrigin" y "value".' }),
    common_1.HttpCode(200),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transactionPresenter, false),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gloov_dto_1.SendTransactinoDto]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "addTokensChargeBack", null);
__decorate([
    common_1.Post('addTokensBonds'),
    swagger_1.ApiOperation({ description: 'Este servicio realiza para la adición de monedas en la cuenta de bonos. El Body requiere "value".' }),
    common_1.HttpCode(200),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transactionPresenter, false),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gloov_dto_1.SendTransactinoDto]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "addTokensBonds", null);
__decorate([
    common_1.Post('addBonds'),
    swagger_1.ApiOperation({ description: 'Este servicio realiza la carga de bonos a un usuario en especifico. El Body requiere "accDestiny" y "value".' }),
    common_1.HttpCode(200),
    response_decorator_1.ApiResponseType(gloov_presenter_1.transactionPresenter, false),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gloov_dto_1.SendTransactinoDto]),
    __metadata("design:returntype", Promise)
], GloovController.prototype, "addBonds", null);
GloovController = __decorate([
    common_1.Controller('gloov'),
    swagger_1.ApiTags('Blockchain'),
    swagger_1.ApiResponse({ status: 500, description: 'Internal error' }),
    swagger_1.ApiExtraModels(gloov_presenter_1.IsGloovBalancePresenter),
    __param(0, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.GET_BALANCE)),
    __param(1, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.CREATE_ACCOUNT)),
    __param(2, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.SEND_TRANSACTION)),
    __param(3, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.WITHDRAWALS)),
    __param(4, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.RETURN_USER)),
    __param(5, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.CASH_RETURN)),
    __param(6, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.ADD_TOKENS)),
    __param(7, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.ADD_TOKENS_CHARGE_BACK)),
    __param(8, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.ADD_TOKENS_BONDS)),
    __param(9, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.ADD_BONDS)),
    __param(10, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.TRANSIT_TOKENS)),
    __metadata("design:paramtypes", [usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy])
], GloovController);
exports.GloovController = GloovController;
//# sourceMappingURL=gloov.controller.js.map