import { UserRoleEnum } from '../entities/user.entity';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: UserRoleEnum;
}
