import { Model } from 'sequelize-typescript';
import { Department } from '../../departments/entities/department.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Message } from '../../messages/entities/message.entity';
import { Role } from './role.entity';
export declare enum UserRoleEnum {
    SUPERADMIN = "superadmin",
    SUPPORT = "support",
    USER = "user",
    EWANO = "ewano"
}
export declare class User extends Model<User> {
    id: string;
    email: string;
    name: string;
    password: string;
    role: UserRoleEnum;
    departmentId: string;
    department: Department;
    createdTickets: Ticket[];
    assignedTickets: Ticket[];
    messages: Message[];
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}
