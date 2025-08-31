import { Model } from 'sequelize-typescript';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';
export declare class Message extends Model<Message> {
    id: number;
    content: string;
    ticketId: number;
    userId: string;
    ticket: Ticket;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
