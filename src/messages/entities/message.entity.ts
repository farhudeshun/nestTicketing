import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';

@Table({
  tableName: 'messages',
  underscored: true,
  timestamps: true,
})
export class Message extends Model<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => Ticket)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  ticketId: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
