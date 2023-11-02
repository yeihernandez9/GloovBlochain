import { Injectable } from "@nestjs/common";
import { AuditRepository } from "src/domain/repositories/auditRepository.interface";
import { Audit } from "../entities/audit.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuditM } from "src/domain/model/audit";

@Injectable()
export class DatabaseAuditRepository implements AuditRepository {
    constructor(
        @InjectRepository(Audit)
        private readonly auditEntityRepository: Repository<Audit>,
    ) { }

    async insert(description: string, method: string, value: string): Promise<AuditM> {
        const audit: AuditM = new AuditM()
        audit.description = description;
        audit.method = method;
        audit.value = value;
        const auditEntity = this.toAuditEntity(audit);
        const result = await this.auditEntityRepository.insert(auditEntity);
        return this.toAudit(result.generatedMaps[0] as Audit);
    }

    private toAudit(auditEntity: Audit): AuditM {
        const audit: AuditM = new AuditM();

        audit.id = auditEntity.id;
        audit.description = auditEntity.description;
        audit.method = auditEntity.method;
        audit.value = auditEntity.value;
        audit.isDone = auditEntity.is_done;
        audit.createdDate = auditEntity.created_date;
        audit.updatedDate = auditEntity.updated_date;

        return audit;
    }

    private toAuditEntity(audit: AuditM): Audit {
        const auditEntity: Audit = new Audit();

        auditEntity.id = audit.id;
        auditEntity.description = audit.description;
        auditEntity.method = audit.method;
        auditEntity.value = audit.value;
        auditEntity.is_done = audit.isDone;

        return auditEntity;
    }
}