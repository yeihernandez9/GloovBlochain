import { registerUseCases } from './../../../usecases/auth/register.usecases';
import { AuthLoginDto, AuthRegisterDto } from './auth-dto.class';
import { IsAuthPresenter, RegisterPresenter } from './auth.presenter';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';
export declare class AuthController {
    private readonly loginUsecaseProxy;
    private readonly logoutUsecaseProxy;
    private readonly isAuthUsecaseProxy;
    private readonly registerUseCases;
    constructor(loginUsecaseProxy: UseCaseProxy<LoginUseCases>, logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>, isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>, registerUseCases: UseCaseProxy<registerUseCases>);
    login(auth: AuthLoginDto, request: any): Promise<string>;
    register(registerAuth: AuthRegisterDto, request: any): Promise<RegisterPresenter>;
    logout(request: any): Promise<string>;
    isAuthenticated(request: any): Promise<IsAuthPresenter>;
    refresh(request: any): Promise<string>;
}
