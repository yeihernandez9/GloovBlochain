import { UserWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
export declare class IsAuthenticatedUseCases {
    private readonly adminUserRepo;
    constructor(adminUserRepo: UserRepository);
    execute(username: string): Promise<UserWithoutPassword>;
}
