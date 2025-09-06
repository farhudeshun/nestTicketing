import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Table({
  tableName: 'departments',
  underscored: true,
  timestamps: false,
})
export class Department extends Model<Department> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  name: string;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
