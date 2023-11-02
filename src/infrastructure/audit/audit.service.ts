import { Injectable } from '@nestjs/common';
import { IAudit } from 'src/domain/audit/audit.interface';

@Injectable()
export class AuditService implements IAudit {

}
