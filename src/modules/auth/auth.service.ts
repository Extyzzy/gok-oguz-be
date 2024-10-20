import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { responseStatus } from '../../constants/statuses.const';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  private developerProviderName: string;

  constructor(private readonly usersService: UsersService) {}

  prepareToken(user: Users, ttl: number): string {
    return jwt.sign(
      {
        sub: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        iss: this.developerProviderName,
        aud: user.uuid,
        iat: Math.floor(Date.now() / 1000),
        exp: ttl,
      },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
      },
    );
  }

  getTokens(user: Users): AuthTokens {
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    try {
      const token = this.prepareToken(
        user,
        Math.floor(Date.now() / 1000) + 60 * 60,
      );
      const refreshToken = this.prepareToken(
        user,
        Math.floor(Date.now() / 1000) + 60 * 60 * 8,
      );

      return {
        accessToken: token,
        refreshToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user: Users) {
    const { accessToken, refreshToken } = this.getTokens(user);

    return {
      statusCode: 200,
      user,
      accessToken,
      refreshToken,
    };
  }

  async authenticate(token: string) {
    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    try {
      const decoded = this.verifyToken(token);
      const user = await this.findUser(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      return user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const decoded = jwt.decode(token);
        const userId = decoded?.sub;

        if (userId) {
          const user = await this.usersService.findOneById(+userId);
          const refreshToken = user.refresh_token;

          if (refreshToken && this.verifyToken(refreshToken)) {
            return this.getTokens(user);
          } else {
            throw new UnauthorizedException('Refresh token is missing.');
          }
        } else {
          throw new UnauthorizedException('Cannot decode user ID.');
        }
      } else {
        throw new UnauthorizedException('Invalid access token.');
      }
    }
  }

  async logout(user: Users, token: string) {
    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    try {
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      await this.usersService.update(user.id, {
        refresh_token: null,
      });

      return {
        message: 'User logged out',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }

  private verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  private verifyRefreshToken(token: string): any {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  }

  private async findUser(userId: number): Promise<any | null> {
    return this.usersService.findOneById(userId);
  }

  async register(registerDto: any) {
    try {
      const user: Users = await this.usersService.create(registerDto);

      return this.login(user);
    } catch (e) {
      return {
        statusCode: responseStatus.failed,
        user: null,
      };
    }
  }
}
