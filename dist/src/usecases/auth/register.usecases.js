"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUseCases = void 0;
const user_1 = require("../../domain/model/user");
class registerUseCases {
    constructor(logger, userRepository, bcryptService) {
        this.logger = logger;
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async execute(username, password) {
        const user = new user_1.UserM();
        const pass = await this.bcryptService.hash(password);
        user.username = username;
        user.password = pass;
        const result = await this.userRepository.insert(user);
        this.logger.log('registeroUseCases execute', 'New Usuario have been inserted');
        return result;
    }
}
exports.registerUseCases = registerUseCases;
//# sourceMappingURL=register.usecases.js.map