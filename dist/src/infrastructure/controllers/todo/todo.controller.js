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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usecases_proxy_1 = require("../../usecases-proxy/usecases-proxy");
const usecases_proxy_module_1 = require("../../usecases-proxy/usecases-proxy.module");
const todo_presenter_1 = require("./todo.presenter");
const response_decorator_1 = require("../../common/swagger/response.decorator");
const todo_dto_1 = require("./todo.dto");
let TodoController = class TodoController {
    constructor(getTodoUsecaseProxy, getAllTodoUsecaseProxy, updateTodoUsecaseProxy, deleteTodoUsecaseProxy, addTodoUsecaseProxy) {
        this.getTodoUsecaseProxy = getTodoUsecaseProxy;
        this.getAllTodoUsecaseProxy = getAllTodoUsecaseProxy;
        this.updateTodoUsecaseProxy = updateTodoUsecaseProxy;
        this.deleteTodoUsecaseProxy = deleteTodoUsecaseProxy;
        this.addTodoUsecaseProxy = addTodoUsecaseProxy;
    }
    async getTodo(id) {
        const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
        return new todo_presenter_1.TodoPresenter(todo);
    }
    async getTodos() {
        const todos = await this.getAllTodoUsecaseProxy.getInstance().execute();
        return todos.map((todo) => new todo_presenter_1.TodoPresenter(todo));
    }
    async updateTodo(updateTodoDto) {
        const { id, isDone } = updateTodoDto;
        await this.updateTodoUsecaseProxy.getInstance().execute(id, isDone);
        return 'success';
    }
    async deleteTodo(id) {
        await this.deleteTodoUsecaseProxy.getInstance().execute(id);
        return 'success';
    }
    async addTodo(addTodoDto) {
        const { content } = addTodoDto;
        const todoCreated = await this.addTodoUsecaseProxy.getInstance().execute(content);
        return new todo_presenter_1.TodoPresenter(todoCreated);
    }
};
__decorate([
    response_decorator_1.ApiResponseType(todo_presenter_1.TodoPresenter, false),
    __param(0, common_1.Query('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodo", null);
__decorate([
    response_decorator_1.ApiResponseType(todo_presenter_1.TodoPresenter, true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodos", null);
__decorate([
    response_decorator_1.ApiResponseType(todo_presenter_1.TodoPresenter, true),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.UpdateTodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodo", null);
__decorate([
    response_decorator_1.ApiResponseType(todo_presenter_1.TodoPresenter, true),
    __param(0, common_1.Query('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
__decorate([
    response_decorator_1.ApiResponseType(todo_presenter_1.TodoPresenter, true),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.AddTodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "addTodo", null);
TodoController = __decorate([
    common_1.Controller('todo'),
    swagger_1.ApiTags('todo'),
    swagger_1.ApiResponse({ status: 500, description: 'Internal error' }),
    swagger_1.ApiExtraModels(todo_presenter_1.TodoPresenter),
    __param(0, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.GET_TODO_USECASES_PROXY)),
    __param(1, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.GET_TODOS_USECASES_PROXY)),
    __param(2, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.PUT_TODO_USECASES_PROXY)),
    __param(3, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.DELETE_TODO_USECASES_PROXY)),
    __param(4, common_1.Inject(usecases_proxy_module_1.UsecasesProxyModule.POST_TODO_USECASES_PROXY)),
    __metadata("design:paramtypes", [usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map