import { TicketPriority, TicketStatus } from '../entities/ticket.entity';
export declare class UpdateTicketDto {
    title?: string;
    description?: string;
    priority?: TicketPriority;
    status?: TicketStatus;
    supportId?: string;
}
