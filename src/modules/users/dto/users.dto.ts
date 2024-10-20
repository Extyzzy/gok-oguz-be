import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 1, description: 'Unique user identifier' })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    uniqueItems: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'e807f1fcf82d132f9bb018ca6738a19f',
    description: 'User UUID',
  })
  @IsUUID()
  uuid: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '2024-09-25T17:23:46.123Z',
    description: 'Creation timestamp',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-09-25T17:23:46.123Z',
    description: 'Last updated timestamp',
  })
  updated_at: Date;
}
