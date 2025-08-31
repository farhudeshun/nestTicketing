import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
export declare class MessagesService {
    private messageModel;
    constructor(messageModel: typeof Message);
    create(createMessageDto: CreateMessageDto, userId: string): Promise<Message>;
    findAllByTicket(ticketId: number): Promise<Message[]>;
    findOne(id: number): Promise<Message>;
    remove(id: number): Promise<void>;
}
