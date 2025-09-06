import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
  BelongsTo,
  ForeignKey,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Message } from '../../messages/entities/message.entity';

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

@Table({
  tableName: 'tickets',
  underscored: true,
  timestamps: true,
})
export class Ticket extends Model<Ticket> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Default(TicketStatus.OPEN)
  @Column(DataType.ENUM(...Object.values(TicketStatus)))
  status: TicketStatus;

  @AllowNull(false)
  @Default(TicketPriority.LOW)
  @Column(DataType.ENUM(...Object.values(TicketPriority)))
  priority: TicketPriority;

  @Column(DataType.DATE)
  assignedDate: Date;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  supportId: string;

  @ForeignKey(() => Department)
  @Column(DataType.UUID)
  departmentId: string;

  @BelongsTo(() => User, 'userId')
  creator: User;

  @BelongsTo(() => User, 'supportId')
  support: User;

  @BelongsTo(() => Department)
  department: Department;

  @HasMany(() => Message)
  messages: Message[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
