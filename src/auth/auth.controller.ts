import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  Request,
  UseGuards,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '@app/auth/auth.service';
import { UsersService } from '@app/users/users.service';
import { LoginDto } from '@app/auth/dto/login.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { User } from '@app/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Current user profile', type: User })
  async getProfile(@Request() req: { user: { userId: number } }) {
    return this.usersService.findByIdWithoutPassword(req.user.userId);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.authService.getTokens(user);
    response.setHeader('Set-Cookie', [
      `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION}; SameSite=None; Secure=false`, // for dev (use true in prod)
      `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=None; Secure=false`, // for dev (use true in prod)
    ]);

    return user;
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  logout(@Res({ passthrough: true }) response: Response) {
    response.setHeader(
      'Set-Cookie',
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
    );
    return { message: 'Logged out successfully' };
  }
}
