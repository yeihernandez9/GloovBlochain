import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IJwtService } from '../../domain/adapters/jwt.interface';
import { JWTConfig } from '../../domain/config/jwt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
export declare class LoginUseCases {
    private readonly logger;
    private readonly jwtTokenService;
    private readonly jwtConfig;
    private readonly userRepository;
    private readonly bcryptService;
    constructor(logger: ILogger, jwtTokenService: IJwtService, jwtConfig: JWTConfig, userRepository: UserRepository, bcryptService: IBcryptService);
    getCookieWithJwtToken(username: string): Promise<string>;
    getCookieWithJwtRefreshToken(username: string): Promise<string>;
    validateUserForLocalStragtegy(username: string, pass: string): Promise<{
        id: number;
        username: string;
        createDate: Date;
        updatedDate: Date;
        lastLogin: Date;
        hashRefreshToken: string;
    }>;
    validateUserForJWTStragtegy(username: string): Promise<import("../../domain/model/user").UserM>;
    updateLoginTime(username: string): Promise<void>;
    setCurrentRefreshToken(refreshToken: string, username: string): Promise<void>;
    getUserIfRefreshTokenMatches(refreshToken: string, username: string): Promise<import("../../domain/model/user").UserM>;
}
