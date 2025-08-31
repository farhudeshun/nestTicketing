import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { AssignToSupportDto } from '../dto/assign-to-support.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto, req: any): Promise<import("../entities/ticket.entity").Ticket>;
    findAll(): Promise<import("../entities/ticket.entity").Ticket[]>;
    findOne(id: string): Promise<import("../entities/ticket.entity").Ticket>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<[number, import("../entities/ticket.entity").Ticket[]]>;
    remove(id: string): Promise<void>;
    assignToSupport(ticketId: string, assignToSupportDto: AssignToSupportDto): Promise<[number, import("../entities/ticket.entity").Ticket[]]>;
}
