"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosUseCases = void 0;
class getTodosUseCases {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async execute() {
        return await this.todoRepository.findAll();
    }
}
exports.getTodosUseCases = getTodosUseCases;
//# sourceMappingURL=getTodos.usecases.js.map