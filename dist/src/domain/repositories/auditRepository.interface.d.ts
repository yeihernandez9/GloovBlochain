import { AuditM } from "../model/audit";
export interface AuditRepository {
    insert(description: string, method: string, value: string): Promise<AuditM>;
}
