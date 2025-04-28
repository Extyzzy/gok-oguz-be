import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedAdminUser() {
    const adminExists = await this.userRepository.findOne({
      where: { email: process.env.ADMIN_EMAIL },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD as string,
        10,
      );
      const adminUser = await this.userRepository.save({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        firstName: 'Ruslan',
        lastName: 'Timbal',
        isActive: true,
        roles: ['admin'],
      });
      return { message: 'Admin user created', user: adminUser };
    }
    return { message: 'Admin user already exists' };
  }
}
