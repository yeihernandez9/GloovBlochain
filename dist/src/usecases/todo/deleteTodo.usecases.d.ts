import { ILogger } from '../../domain/logger/logger.interface';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
export declare class deleteTodoUseCases {
    private readonly logger;
    private readonly todoRepository;
    constructor(logger: ILogger, todoRepository: TodoRepository);
    execute(id: number): Promise<void>;
}
