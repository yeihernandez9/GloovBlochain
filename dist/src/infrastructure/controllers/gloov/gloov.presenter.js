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
Object.defineProperty(exports, "__esModule", { value: true });
exports.transitTokensPresenter = exports.transactionPresenter = exports.createAccountPresenter = exports.IsGloovBalancePresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
class IsGloovBalancePresenter {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], IsGloovBalancePresenter.prototype, "balance", void 0);
exports.IsGloovBalancePresenter = IsGloovBalancePresenter;
class createAccountPresenter {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createAccountPresenter.prototype, "publicKey", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createAccountPresenter.prototype, "privateKey", void 0);
exports.createAccountPresenter = createAccountPresenter;
class transactionPresenter {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], transactionPresenter.prototype, "txHash", void 0);
exports.transactionPresenter = transactionPresenter;
class transitTokensPresenter {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], transitTokensPresenter.prototype, "available", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], transitTokensPresenter.prototype, "transit", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], transitTokensPresenter.prototype, "total", void 0);
exports.transitTokensPresenter = transitTokensPresenter;
//# sourceMappingURL=gloov.presenter.js.map