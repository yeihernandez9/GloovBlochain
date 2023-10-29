import { ILogger } from '../../domain/logger/logger.interface';
import { TodoM } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
export declare class addTodoUseCases {
    private readonly logger;
    private readonly todoRepository;
    constructor(logger: ILogger, todoRepository: TodoRepository);
    execute(content: string): Promise<TodoM>;
}
