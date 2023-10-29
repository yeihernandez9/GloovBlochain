import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
export declare class registerUseCases {
    private readonly logger;
    private readonly userRepository;
    private readonly bcryptService;
    constructor(logger: ILogger, userRepository: UserRepository, bcryptService: IBcryptService);
    execute(username: string, password: string): Promise<UserM>;
}
