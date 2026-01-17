import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@app/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@app/users//entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  login(user: User) {
    const payload = {
      email: user.email,
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getTokens(user: User) {
    const payload = { email: user.email, userId: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload);

    return { accessToken, refreshToken };
  }
}
