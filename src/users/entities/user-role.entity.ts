import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Role } from './role.entity';

@Table({
  tableName: 'user_roles',
  underscored: true,
  timestamps: false,
})
export class UserRole extends Model<UserRole> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column(DataType.UUID)
  roleId: string;
}

