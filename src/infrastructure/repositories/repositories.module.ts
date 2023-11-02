import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { Transactions } from '../entities/transactions.entity';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseBlockchainRepository } from './blockchain.repository'
import { Audit } from '../entities/audit.entity';
import { DatabaseAuditRepository } from './audit.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Todo, User, Transactions, Audit])],
  providers: [DatabaseTodoRepository, DatabaseUserRepository, DatabaseBlockchainRepository, DatabaseAuditRepository],
  exports: [DatabaseTodoRepository, DatabaseUserRepository, DatabaseBlockchainRepository, DatabaseAuditRepository],
})
export class RepositoriesModule { }
