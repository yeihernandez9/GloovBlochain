import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class registerUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(username: string, password: string): Promise<UserM> {
    const user = new UserM();
    const pass = await this.bcryptService.hash(password);
    user.username = username;
    user.password = pass;
    const result = await this.userRepository.insert(user);
    this.logger.log('registeroUseCases execute', 'New Usuario have been inserted');
    return result;
  }
}
