import { Repository } from 'typeorm';
import { TodoM } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
import { Todo } from '../entities/todo.entity';
export declare class DatabaseTodoRepository implements TodoRepository {
    private readonly todoEntityRepository;
    constructor(todoEntityRepository: Repository<Todo>);
    updateContent(id: number, isDone: boolean): Promise<void>;
    insert(todo: TodoM): Promise<TodoM>;
    findAll(): Promise<TodoM[]>;
    findById(id: number): Promise<TodoM>;
    deleteById(id: number): Promise<void>;
    private toTodo;
    private toTodoEntity;
}
