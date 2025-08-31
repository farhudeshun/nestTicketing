import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRoleEnum } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'updateduser@example.com',
    format: 'email',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100, { message: 'Email can be at most 100 characters long' })
  email?: string;

  @ApiPropertyOptional({
    description: 'User password',
    example: 'NewStrongPass123',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @ApiPropertyOptional({
    description: 'User role',
    example: 'support',
    enum: UserRoleEnum,
  })
  @IsOptional()
  @IsEnum(UserRoleEnum, { message: 'Invalid user role' })
  role?: UserRoleEnum;
}

