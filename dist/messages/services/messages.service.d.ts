import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
export declare class MessagesService {
    private readonly messageRepo;
    constructor(messageRepo: Repository<Message>);
    create(createMessageDto: CreateMessageDto, userId: string): Promise<Message>;
    findAllByTicket(ticketId: number): Promise<Message[]>;
    findOne(id: number): Promise<Message>;
    remove(id: number): Promise<void>;
}
