import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  AllowNull,
  BelongsTo,
  ForeignKey,
  HasMany,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Department } from '../../departments/entities/department.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Message } from '../../messages/entities/message.entity';
import { Role } from './role.entity';
import { UserRole } from './user-role.entity';

export enum UserRoleEnum {
  SUPERADMIN = 'superadmin',
  SUPPORT = 'support',
  USER = 'user',
  EWANO = 'ewano',
}

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(100))
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  password: string;

  @AllowNull(false)
  @Default(UserRoleEnum.USER)
  @Column(DataType.ENUM(...Object.values(UserRoleEnum)))
  role: UserRoleEnum;

  @ForeignKey(() => Department)
  @Column(DataType.UUID)
  departmentId: string;

  @BelongsTo(() => Department)
  department: Department;

  @HasMany(() => Ticket, 'userId')
  createdTickets: Ticket[];

  @HasMany(() => Ticket, 'supportId')
  assignedTickets: Ticket[];

  @HasMany(() => Message)
  messages: Message[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

