import { TodoM } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
export declare class getTodosUseCases {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    execute(): Promise<TodoM[]>;
}
