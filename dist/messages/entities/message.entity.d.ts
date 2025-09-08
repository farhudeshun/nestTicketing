import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';
export declare class Message {
    id: number;
    content: string;
    ticketId: number;
    ticket: Ticket;
    userId: number;
    user: User;
    seenDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
