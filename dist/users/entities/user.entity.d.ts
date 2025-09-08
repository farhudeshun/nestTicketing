import { Department } from '../../departments/entities/department.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Role } from './role.entity';
import { userState } from '@ngn-net/giftcard-shared';
export declare enum UserRoleEnum {
    SUPERADMIN = "superadmin",
    SUPPORT = "support",
    USER = "user",
    EWANO = "ewano"
}
export declare class User {
    id: number;
    email?: string;
    phone?: string;
    state: userState;
    userid: string;
    fullName: string;
    password: string;
    roles: Role[];
    department: Department;
    createdTickets: Ticket[];
    assignedTickets: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
