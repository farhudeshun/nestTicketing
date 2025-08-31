import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'User full name',
    example: 'Ali Sabeti',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MaxLength(100, { message: 'Name can be at most 100 characters long' })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100, { message: 'Email can be at most 100 characters long' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongPassword123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

