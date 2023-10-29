import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { GetTodoUseCases } from '../../../usecases/todo/getTodo.usecases';
import { TodoPresenter } from './todo.presenter';
import { getTodosUseCases } from '../../../usecases/todo/getTodos.usecases';
import { updateTodoUseCases } from '../../../usecases/todo/updateTodo.usecases';
import { AddTodoDto, UpdateTodoDto } from './todo.dto';
import { deleteTodoUseCases } from '../../../usecases/todo/deleteTodo.usecases';
import { addTodoUseCases } from '../../../usecases/todo/addTodo.usecases';
export declare class TodoController {
    private readonly getTodoUsecaseProxy;
    private readonly getAllTodoUsecaseProxy;
    private readonly updateTodoUsecaseProxy;
    private readonly deleteTodoUsecaseProxy;
    private readonly addTodoUsecaseProxy;
    constructor(getTodoUsecaseProxy: UseCaseProxy<GetTodoUseCases>, getAllTodoUsecaseProxy: UseCaseProxy<getTodosUseCases>, updateTodoUsecaseProxy: UseCaseProxy<updateTodoUseCases>, deleteTodoUsecaseProxy: UseCaseProxy<deleteTodoUseCases>, addTodoUsecaseProxy: UseCaseProxy<addTodoUseCases>);
    getTodo(id: number): Promise<TodoPresenter>;
    getTodos(): Promise<TodoPresenter[]>;
    updateTodo(updateTodoDto: UpdateTodoDto): Promise<string>;
    deleteTodo(id: number): Promise<string>;
    addTodo(addTodoDto: AddTodoDto): Promise<TodoPresenter>;
}
