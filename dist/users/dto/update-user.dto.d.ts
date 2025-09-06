import { UserRoleEnum } from '../entities/user.entity';
export declare class UpdateUserDto {
    readonly name?: string;
    readonly email?: string;
    readonly password?: string;
    readonly role?: UserRoleEnum;
}
