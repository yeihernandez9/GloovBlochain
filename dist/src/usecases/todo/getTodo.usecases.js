"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTodoUseCases = void 0;
class GetTodoUseCases {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async execute(id) {
        return await this.todoRepository.findById(id);
    }
}
exports.GetTodoUseCases = GetTodoUseCases;
//# sourceMappingURL=getTodo.usecases.js.map