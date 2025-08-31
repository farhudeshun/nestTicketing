import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket) private ticketModel: typeof Ticket,
  ) {}

  async create(createTicketDto: CreateTicketDto, userId: string): Promise<Ticket> {
    return this.ticketModel.create({ ...createTicketDto, userId } as any);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.findAll({
      include: [{ model: User, as: 'creator' }, { model: User, as: 'support' }, Department],
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketModel.findByPk(id, {
      include: [{ model: User, as: 'creator' }, { model: User, as: 'support' }, Department],
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<[number, Ticket[]]> {
    const [affectedCount, affectedRows] = await this.ticketModel.update(updateTicketDto, {
      where: { id },
      returning: true,
    });
    if (affectedCount === 0) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return [affectedCount, affectedRows];
  }

  async remove(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await ticket.destroy();
  }

  async assignToSupport(ticketId: number, supportId: string): Promise<[number, Ticket[]]> {
    const [affectedCount, affectedRows] = await this.ticketModel.update(
      { supportId, assignedDate: new Date() },
      { where: { id: ticketId }, returning: true },
    );
    if (affectedCount === 0) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }
    return [affectedCount, affectedRows];
  }
}

