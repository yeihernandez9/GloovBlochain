"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoUseCases = void 0;
class updateTodoUseCases {
    constructor(logger, todoRepository) {
        this.logger = logger;
        this.todoRepository = todoRepository;
    }
    async execute(id, isDone) {
        await this.todoRepository.updateContent(id, isDone);
        this.logger.log('updateTodoUseCases execute', `Todo ${id} have been updated`);
    }
}
exports.updateTodoUseCases = updateTodoUseCases;
//# sourceMappingURL=updateTodo.usecases.js.map