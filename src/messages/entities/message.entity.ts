import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  content: string;
  @Column()
  ticketId: number;
  @ManyToOne(() => Ticket, (tic) => tic.messages)
  ticket: Ticket;

  userId: number;
  @ManyToOne(() => User)
  user: User;
  @Column({ type: 'timestamp with time zone' })
  seenDate: Date;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
