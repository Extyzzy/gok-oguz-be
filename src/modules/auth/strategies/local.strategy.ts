import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Users } from '../../users/users.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user: Users = await this.usersService.findOneByCredentials(
      email,
      password,
    );

    console.info(user);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
