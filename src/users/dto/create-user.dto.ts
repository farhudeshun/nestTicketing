import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'New User',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MaxLength(100, { message: 'Name can be at most 100 characters long' })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'newuser@example.com',
    format: 'email',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100, { message: 'Email can be at most 100 characters long' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongPass123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiPropertyOptional({
    description: 'User role',
    example: 'user',
    enum: UserRoleEnum,
  })
  @IsOptional()
  @IsEnum(UserRoleEnum, { message: 'Invalid user role' })
  role?: UserRoleEnum;
}

