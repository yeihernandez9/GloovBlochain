import { DynamicModule } from '@nestjs/common';
export declare class UsecasesProxyModule {
    static LOGIN_USECASES_PROXY: string;
    static IS_AUTHENTICATED_USECASES_PROXY: string;
    static LOGOUT_USECASES_PROXY: string;
    static REGISTER_USECASES_PROXY: string;
    static GET_TODO_USECASES_PROXY: string;
    static GET_TODOS_USECASES_PROXY: string;
    static POST_TODO_USECASES_PROXY: string;
    static DELETE_TODO_USECASES_PROXY: string;
    static PUT_TODO_USECASES_PROXY: string;
    static GET_BALANCE: string;
    static CREATE_ACCOUNT: string;
    static SEND_TRANSACTION: string;
    static WITHDRAWALS: string;
    static RETURN_USER: string;
    static CASH_RETURN: string;
    static ADD_TOKENS: string;
    static ADD_TOKENS_CHARGE_BACK: string;
    static ADD_TOKENS_BONDS: string;
    static ADD_BONDS: string;
    static TRANSIT_TOKENS: string;
    static STATUS: string;
    static register(): DynamicModule;
}
