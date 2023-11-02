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
exports.DatabaseAuditRepository = void 0;
const common_1 = require("@nestjs/common");
const auditRepository_interface_1 = require("../../domain/repositories/auditRepository.interface");
const audit_entity_1 = require("../entities/audit.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_1 = require("../../domain/model/audit");
let DatabaseAuditRepository = class DatabaseAuditRepository {
    constructor(auditEntityRepository) {
        this.auditEntityRepository = auditEntityRepository;
    }
    async insert(description, method, value) {
        const audit = new audit_1.AuditM();
        audit.description = description;
        audit.method = method;
        audit.value = value;
        const auditEntity = this.toAuditEntity(audit);
        const result = await this.auditEntityRepository.insert(auditEntity);
        return this.toAudit(result.generatedMaps[0]);
    }
    toAudit(auditEntity) {
        const audit = new audit_1.AuditM();
        audit.id = auditEntity.id;
        audit.description = auditEntity.description;
        audit.method = auditEntity.method;
        audit.value = auditEntity.value;
        audit.isDone = auditEntity.is_done;
        audit.createdDate = auditEntity.created_date;
        audit.updatedDate = auditEntity.updated_date;
        return audit;
    }
    toAuditEntity(audit) {
        const auditEntity = new audit_entity_1.Audit();
        auditEntity.id = audit.id;
        auditEntity.description = audit.description;
        auditEntity.method = audit.method;
        auditEntity.value = audit.value;
        auditEntity.is_done = audit.isDone;
        return auditEntity;
    }
};
DatabaseAuditRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(audit_entity_1.Audit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DatabaseAuditRepository);
exports.DatabaseAuditRepository = DatabaseAuditRepository;
//# sourceMappingURL=audit.repository.js.map