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
exports.DatabaseTodoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_1 = require("../../domain/model/todo");
const todo_entity_1 = require("../entities/todo.entity");
let DatabaseTodoRepository = class DatabaseTodoRepository {
    constructor(todoEntityRepository) {
        this.todoEntityRepository = todoEntityRepository;
    }
    async updateContent(id, isDone) {
        await this.todoEntityRepository.update({
            id: id,
        }, { is_done: isDone });
    }
    async insert(todo) {
        const todoEntity = this.toTodoEntity(todo);
        const result = await this.todoEntityRepository.insert(todoEntity);
        return this.toTodo(result.generatedMaps[0]);
    }
    async findAll() {
        const todosEntity = await this.todoEntityRepository.find();
        return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
    }
    async findById(id) {
        const todoEntity = await this.todoEntityRepository.findOneOrFail(id);
        return this.toTodo(todoEntity);
    }
    async deleteById(id) {
        await this.todoEntityRepository.delete({ id: id });
    }
    toTodo(todoEntity) {
        const todo = new todo_1.TodoM();
        todo.id = todoEntity.id;
        todo.content = todoEntity.content;
        todo.isDone = todoEntity.is_done;
        todo.createdDate = todoEntity.created_date;
        todo.updatedDate = todoEntity.updated_date;
        return todo;
    }
    toTodoEntity(todo) {
        const todoEntity = new todo_entity_1.Todo();
        todoEntity.id = todo.id;
        todoEntity.content = todo.content;
        todoEntity.is_done = todo.isDone;
        return todoEntity;
    }
};
DatabaseTodoRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DatabaseTodoRepository);
exports.DatabaseTodoRepository = DatabaseTodoRepository;
//# sourceMappingURL=todo.repository.js.map