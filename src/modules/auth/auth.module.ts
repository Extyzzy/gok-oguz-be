import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersService } from '../users/users.service';

import JwtStrategy from './strategies/jwt.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import LocalStrategy from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
    ConfigService,
    LocalStrategy,
    UsersService,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
