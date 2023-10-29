import { ApiProperty } from '@nestjs/swagger';
import { UserM } from '../../../domain/model/user';

export class IsAuthPresenter {
  @ApiProperty()
  username: string;
}

export class RegisterPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;

  constructor(user: UserM) {
    this.id = user.id;
    this.username = user.username;
  }
}
