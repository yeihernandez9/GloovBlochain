import { TodoM } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
export declare class GetTodoUseCases {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    execute(id: number): Promise<TodoM>;
}
