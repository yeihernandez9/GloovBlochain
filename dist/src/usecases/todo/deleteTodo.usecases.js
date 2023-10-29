"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoUseCases = void 0;
class deleteTodoUseCases {
    constructor(logger, todoRepository) {
        this.logger = logger;
        this.todoRepository = todoRepository;
    }
    async execute(id) {
        await this.todoRepository.deleteById(id);
        this.logger.log('deleteTodoUseCases execute', `Todo ${id} have been deleted`);
    }
}
exports.deleteTodoUseCases = deleteTodoUseCases;
//# sourceMappingURL=deleteTodo.usecases.js.map