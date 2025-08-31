import { Model } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
export declare class Department extends Model<Department> {
    id: string;
    name: string;
    users: User[];
    tickets: Ticket[];
}
