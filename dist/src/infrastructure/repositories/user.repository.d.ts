import { Repository } from 'typeorm';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';
export declare class DatabaseUserRepository implements UserRepository {
    private readonly userEntityRepository;
    constructor(userEntityRepository: Repository<User>);
    insert(user: UserM): Promise<UserM>;
    updateRefreshToken(username: string, refreshToken: string): Promise<void>;
    getUserByUsername(username: string): Promise<UserM>;
    updateLastLogin(username: string): Promise<void>;
    private toUser;
    private toUserEntity;
}
