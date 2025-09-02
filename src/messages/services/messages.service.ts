import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async create(
    createMessageDto: CreateMessageDto,
    userId: string,
  ): Promise<Message> {
    return this.messageModel.create({ ...createMessageDto, userId } as any);
  }

  async findAllByTicket(ticketId: number): Promise<Message[]> {
    return this.messageModel.findAll({
      where: { ticketId },
      include: [User, Ticket],
      order: [['createdAt', 'ASC']],
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageModel.findByPk(id, {
      include: [User, Ticket],
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async remove(id: number): Promise<void> {
    const message = await this.findOne(id);
    await message.destroy();
  }
}
