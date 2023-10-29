import { UserM } from '../../../domain/model/user';
export declare class IsAuthPresenter {
    username: string;
}
export declare class RegisterPresenter {
    id: number;
    username: string;
    constructor(user: UserM);
}
