import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    userId: string,
  ): Promise<Message> {
    const message = this.messageRepo.create({
      ...createMessageDto,
      user: { id: userId } as unknown as User,
    });
    return await this.messageRepo.save(message);
  }

  async findAllByTicket(ticketId: number): Promise<Message[]> {
    return this.messageRepo.find({
      where: { ticket: { id: ticketId } },
      relations: ['user', 'ticket'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepo.findOne({
      where: { id },
      relations: ['user', 'ticket'],
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  async remove(id: number): Promise<void> {
    const result = await this.messageRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
  }
}
