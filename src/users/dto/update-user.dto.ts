import { IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRoleEnum } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @MinLength(6)
  readonly password?: string;

  @IsOptional()
  @IsEnum(UserRoleEnum)
  readonly role?: UserRoleEnum;
}
