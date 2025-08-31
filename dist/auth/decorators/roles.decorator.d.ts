import { UserRoleEnum } from '../../users/entities/user.entity';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserRoleEnum[]) => import("@nestjs/common").CustomDecorator<string>;
