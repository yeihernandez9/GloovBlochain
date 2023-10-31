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
exports.BlockchainController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_decorator_1 = require("../../common/swagger/response.decorator");
const usecases_proxy_1 = require("../../usecases-proxy/usecases-proxy");
const usecases_proxy_module_1 = require("../../usecases-proxy/usecases-proxy.module");
const statusBlockchain_usecases_1 = require("../../../usecases/blockchain/statusBlockchain.usecases");
let BlockchainController = class BlockchainController {
    constructor(statusUsecaseProxy) {
        this.statusUsecaseProxy = statusUsecaseProxy;
    }
    async status() {
        const status = await this.statusUsecaseProxy.getInstance().execute();
        return status;
    }
};
__decorate([
    common_1.Get('livess'),
    swagger_1.ApiOperation({ description: 'Este servicio retorna el estado de la blockchain.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "status", null);
BlockchainController = __decorate([
    common_1.Controller('blockchain'),
    swagger_1.ApiTags('Blockchain'),
    swagger_1.ApiResponse({ status: 500, description: 'Internal error' }),
    swagger_1.ApiExtraModels(),
    __param(0, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.STATUS)),
    __metadata("design:paramtypes", [usecases_proxy_1.UseCaseProxy])
], BlockchainController);
exports.BlockchainController = BlockchainController;
//# sourceMappingURL=blockchain.controller.js.map