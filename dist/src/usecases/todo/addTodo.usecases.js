"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodoUseCases = void 0;
const todo_1 = require("../../domain/model/todo");
class addTodoUseCases {
    constructor(logger, todoRepository) {
        this.logger = logger;
        this.todoRepository = todoRepository;
    }
    async execute(content) {
        const todo = new todo_1.TodoM();
        todo.content = content;
        todo.isDone = false;
        const result = await this.todoRepository.insert(todo);
        this.logger.log('addTodoUseCases execute', 'New todo have been inserted');
        return result;
    }
}
exports.addTodoUseCases = addTodoUseCases;
//# sourceMappingURL=addTodo.usecases.js.map