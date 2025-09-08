import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}

  async create(
    createTicketDto: CreateTicketDto,
    userId: string,
  ): Promise<Ticket> {
    const ticket = this.ticketRepo.create({
      ...createTicketDto,
      createBy: { id: userId } as unknown as User,
    });
    return this.ticketRepo.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({
      relations: ['createBy', 'assignTo', 'department'],
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['createBy', 'assignTo', 'department'],
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepo.preload({
      id,
      ...updateTicketDto,
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return this.ticketRepo.save(ticket);
  }

  async remove(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepo.remove(ticket);
  }

  async assignToSupport(ticketId: number, supportId: string): Promise<Ticket> {
    const ticket = await this.findOne(ticketId);
    ticket.assignTo = { id: supportId } as unknown as User;
    ticket.assignedDate = new Date();
    return this.ticketRepo.save(ticket);
  }
}
