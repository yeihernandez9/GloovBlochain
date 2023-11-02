"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_module_1 = require("../config/typeorm/typeorm.module");
const todo_entity_1 = require("../entities/todo.entity");
const user_entity_1 = require("../entities/user.entity");
const transactions_entity_1 = require("../entities/transactions.entity");
const todo_repository_1 = require("./todo.repository");
const user_repository_1 = require("./user.repository");
const blockchain_repository_1 = require("./blockchain.repository");
const audit_entity_1 = require("../entities/audit.entity");
const audit_repository_1 = require("./audit.repository");
let RepositoriesModule = class RepositoriesModule {
};
RepositoriesModule = __decorate([
    common_1.Module({
        imports: [typeorm_module_1.TypeOrmConfigModule, typeorm_1.TypeOrmModule.forFeature([todo_entity_1.Todo, user_entity_1.User, transactions_entity_1.Transactions, audit_entity_1.Audit])],
        providers: [todo_repository_1.DatabaseTodoRepository, user_repository_1.DatabaseUserRepository, blockchain_repository_1.DatabaseBlockchainRepository, audit_repository_1.DatabaseAuditRepository],
        exports: [todo_repository_1.DatabaseTodoRepository, user_repository_1.DatabaseUserRepository, blockchain_repository_1.DatabaseBlockchainRepository, audit_repository_1.DatabaseAuditRepository],
    })
], RepositoriesModule);
exports.RepositoriesModule = RepositoriesModule;
//# sourceMappingURL=repositories.module.js.map