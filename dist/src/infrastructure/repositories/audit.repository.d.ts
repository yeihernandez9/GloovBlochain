import { AuditRepository } from "src/domain/repositories/auditRepository.interface";
import { Audit } from "../entities/audit.entity";
import { Repository } from "typeorm";
import { AuditM } from "src/domain/model/audit";
export declare class DatabaseAuditRepository implements AuditRepository {
    private readonly auditEntityRepository;
    constructor(auditEntityRepository: Repository<Audit>);
    insert(description: string, method: string, value: string): Promise<AuditM>;
    private toAudit;
    private toAuditEntity;
}
