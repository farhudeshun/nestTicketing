import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<import("../entities/message.entity").Message>;
    findAllByTicket(ticketId: string): Promise<import("../entities/message.entity").Message[]>;
    findOne(id: string): Promise<import("../entities/message.entity").Message>;
    remove(id: string): Promise<void>;
}
