import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
export declare class Department {
    id: number;
    name: string;
    users: User[];
    tickets: Ticket[];
}
