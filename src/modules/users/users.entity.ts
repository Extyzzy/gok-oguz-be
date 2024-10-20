import { ApiHideProperty } from '@nestjs/swagger';
import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  uuid: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ nullable: true, default: null })
  refresh_token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
