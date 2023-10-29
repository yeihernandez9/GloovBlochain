import { TodoM } from '../../../domain/model/todo';
export declare class TodoPresenter {
    id: number;
    content: string;
    isDone: boolean;
    createdate: Date;
    updateddate: Date;
    constructor(todo: TodoM);
}
