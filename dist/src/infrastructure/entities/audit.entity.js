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
exports.Audit = void 0;
const typeorm_1 = require("typeorm");
let Audit = class Audit {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'integer' }),
    __metadata("design:type", Number)
], Audit.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "method", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], Audit.prototype, "value", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Audit.prototype, "is_done", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'createdate' }),
    __metadata("design:type", Date)
], Audit.prototype, "created_date", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updateddate' }),
    __metadata("design:type", Date)
], Audit.prototype, "updated_date", void 0);
Audit = __decorate([
    typeorm_1.Entity()
], Audit);
exports.Audit = Audit;
//# sourceMappingURL=audit.entity.js.map