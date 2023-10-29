"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCases = void 0;
class LoginUseCases {
    constructor(logger, jwtTokenService, jwtConfig, userRepository, bcryptService) {
        this.logger = logger;
        this.jwtTokenService = jwtTokenService;
        this.jwtConfig = jwtConfig;
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async getCookieWithJwtToken(username) {
        this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
        const payload = { username: username };
        const secret = this.jwtConfig.getJwtSecret();
        const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
    }
    async getCookieWithJwtRefreshToken(username) {
        this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
        const payload = { username: username };
        const secret = this.jwtConfig.getJwtRefreshSecret();
        const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        await this.setCurrentRefreshToken(token, username);
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
        return cookie;
    }
    async validateUserForLocalStragtegy(username, pass) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        const match = await this.bcryptService.compare(pass, user.password);
        if (user && match) {
            await this.updateLoginTime(user.username);
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async validateUserForJWTStragtegy(username) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        return user;
    }
    async updateLoginTime(username) {
        await this.userRepository.updateLastLogin(username);
    }
    async setCurrentRefreshToken(refreshToken, username) {
        const currentHashedRefreshToken = await this.bcryptService.hash(refreshToken);
        await this.userRepository.updateRefreshToken(username, currentHashedRefreshToken);
    }
    async getUserIfRefreshTokenMatches(refreshToken, username) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        const isRefreshTokenMatching = await this.bcryptService.compare(refreshToken, user.hashRefreshToken);
        if (isRefreshTokenMatching) {
            return user;
        }
        return null;
    }
}
exports.LoginUseCases = LoginUseCases;
//# sourceMappingURL=login.usecases.js.map