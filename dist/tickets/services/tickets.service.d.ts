import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
export declare class TicketsService {
    private ticketModel;
    constructor(ticketModel: typeof Ticket);
    create(createTicketDto: CreateTicketDto, userId: string): Promise<Ticket>;
    findAll(): Promise<Ticket[]>;
    findOne(id: number): Promise<Ticket>;
    update(id: number, updateTicketDto: UpdateTicketDto): Promise<[number, Ticket[]]>;
    remove(id: number): Promise<void>;
    assignToSupport(ticketId: number, supportId: string): Promise<[number, Ticket[]]>;
}
