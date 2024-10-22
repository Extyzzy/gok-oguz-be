import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { instanceToPlain } from 'class-transformer';

import { responseStatus } from '../../constants/statuses.const';
import AuthToken from '../../decorators/AuthToken.decorator';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';

import CurrentUser from './decorators/current-user.decorator';
import LoginDto from './dto/login.dto';
import LocalAuthGuard from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() userCreds: Users,
  ): Promise<{ user: Users; accessToken: string }> {
    try {
      const userResponse = await this.authService.login(userCreds);
      const { accessToken, refreshToken, user } = userResponse;

      await this.usersService.update(user.id, {
        ...user,
        refresh_token: refreshToken,
      });

      const userData = instanceToPlain(userCreds) as Users;

      return {
        user: {
          ...userData,
        },
        accessToken,
      };
    } catch (e) {
      this.logger.error('Failed to login user', e);

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with logging in',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('authenticate')
  async authenticate(@AuthToken() token: string) {
    return this.authService.authenticate(token);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerDto: any) {
    try {
      const userResponse: any = await this.authService.register(registerDto);

      if (userResponse.statusCode !== 200) {
        return {
          statusCode: responseStatus.failed,
          message: 'Error: duplicate user',
        };
      }

      const {
        tokens: { accessToken, refreshToken },
        user,
      } = userResponse;

      await this.usersService.update(user.id, {
        ...user,
      });

      return {
        user: {
          ...user,
        },
        accessToken,
        refreshToken,
      };
    } catch (e) {
      this.logger.error('Failed to register user', JSON.stringify(e));

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with register in',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('logout')
  async logout(@CurrentUser() user: any, @AuthToken() token: string) {
    return this.authService.logout(user, token);
  }

  @UseGuards(ThrottlerGuard)
  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }

    const isExists = await this.usersService.isEmailTaken(email);

    return { emailExists: isExists };
  }

  @UseGuards(ThrottlerGuard)
  @Put('change-password')
  async changePassword(@Body() body: { id: number; password: string }) {
    if (!body?.id || !body?.password) {
      throw new Error('Missing required fields');
    }

    return this.usersService.changePassword(body.id, body.password);
  }
}
