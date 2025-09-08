import { Department } from '../../departments/entities/department.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Role } from './role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { userState } from '@ngn-net/giftcard-shared';

export enum UserRoleEnum {
  SUPERADMIN = 'superadmin',
  SUPPORT = 'support',
  USER = 'user',
  EWANO = 'ewano',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: userState })
  state: userState;

  @Column()
  userid: string;

  @Column()
  fullName: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Department, (dep) => dep.users)
  department: Department;

  @OneToMany(() => Ticket, (ticket) => ticket.createBy)
  createdTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignTo)
  assignedTickets: Ticket[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
