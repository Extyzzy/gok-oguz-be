import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findAllPagination(page: number, size: number): Promise<Users[]> {
    return this.usersRepository.find({
      skip: Math.abs(size * page),
      take: Math.abs(size),
      order: {
        id: 'ASC',
      },
    });
  }

  async findOneById(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return user;
  }

  async findOneByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findOneByCredentials(email: string, password: string): Promise<Users> {
    const user = await this.findOneByEmail(email);

    if (!user) return null;

    const match = await Users.comparePassword(password, user.password);

    if (!match) return null;

    return {
      ...user,
    };
  }

  async getTotal() {
    return this.usersRepository.count();
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const password = await Users.hashPassword(createUserDto.password);

    const userCreated: Partial<Users> = this.usersRepository.create({
      ...createUserDto,
      password,
    });

    return this.usersRepository.save(userCreated);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const { ...rest } = updateUserDto;

    await this.usersRepository.save({
      id,
      ...rest,
    });

    return this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    await this.usersRepository.delete(id);

    return {
      message: 'User deleted successfully',
    };
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return !!user;
  }

  async changePassword(id: number, password: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPassword = await Users.hashPassword(password);

    await this.usersRepository.update(id, { password: newPassword });

    return {
      message: 'Password updated successfully',
    };
  }

  async deactivate(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update(id, { last_name: 'test' });

    return {
      message: 'User deactivated successfully',
    };
  }
}
