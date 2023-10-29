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
exports.Transactions = void 0;
const typeorm_1 = require("typeorm");
let Transactions = class Transactions {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Transactions.prototype, "hash", void 0);
__decorate([
    typeorm_1.Column({ name: 'block_number' }),
    __metadata("design:type", String)
], Transactions.prototype, "blockNumber", void 0);
__decorate([
    typeorm_1.Column({ name: 'from_address_hash' }),
    __metadata("design:type", String)
], Transactions.prototype, "fromAddressHash", void 0);
__decorate([
    typeorm_1.Column({ name: 'to_address_hash' }),
    __metadata("design:type", String)
], Transactions.prototype, "toAddressHash", void 0);
__decorate([
    typeorm_1.Column({ name: 'value' }),
    __metadata("design:type", Number)
], Transactions.prototype, "value", void 0);
__decorate([
    typeorm_1.Column({ name: 'type' }),
    __metadata("design:type", Number)
], Transactions.prototype, "type", void 0);
Transactions = __decorate([
    typeorm_1.Entity()
], Transactions);
exports.Transactions = Transactions;
//# sourceMappingURL=transactions.entity.js.map