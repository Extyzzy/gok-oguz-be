import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Put,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import JwtAuth from '../auth/decorators/jwt-auth.decorator';

import { Users } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@JwtAuth()
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get('/pagination')
  @Version('1')
  async findAllPagination(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('size', new DefaultValuePipe(100)) size: number,
  ) {
    try {
      const data = await this.usersService.findAllPagination(page, size);
      const total = await this.usersService.getTotal();

      return {
        data,
        total,
      };
    } catch (e) {
      this.logger.error('Failed to retrieve paginated users', e.stack);

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem retrieving the paginated users',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @Version('1')
  createUser(@Body() body: Users) {
    if (!body?.password || !body?.email) {
      throw new Error('Missing required fields');
    }

    return this.usersService.create(body);
  }

  @Get()
  @Version('1')
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (e) {
      console.error(e);
    }
  }

  @Put()
  @Version('1')
  update(@Body() data: Users) {
    try {
      return this.usersService.update(data.id, data);
    } catch (e) {
      console.error(e);
    }
  }

  @Delete()
  @Version('1')
  delete(@Query('id') id: number) {
    try {
      return this.usersService.delete(id);
    } catch (e) {
      console.error(e);
    }
  }

  @Put('/deactivate')
  @Version('1')
  deactivate(@Query('id') id: number) {
    try {
      return this.usersService.deactivate(id);
    } catch (e) {
      console.error(e);
    }
  }
}
