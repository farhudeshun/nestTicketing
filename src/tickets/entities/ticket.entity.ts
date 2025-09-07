import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Message } from '../../messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in-progress',
  CLOSED = 'closed',
  CANCELED_BY_USER = 'canceled by user',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 128 })
  title: string;
  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false, enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  @Column({
    nullable: false,
    enum: TicketPriority,
    default: TicketPriority.LOW,
  })
  priority: TicketPriority;

  @Column({ type: 'timestamp with time zone' })
  assignedDate: Date;

  @ManyToOne(() => User, (user) => user.createdTickets)
  createBy: User;
  @ManyToOne(() => User, (user) => user.assignedTickets)
  assignTo: User;

  @OneToMany(() => Message, (message) => message.ticket)
  messages: Message[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
