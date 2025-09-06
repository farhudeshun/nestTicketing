import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { UserRole } from './user-role.entity';

@Table({
  tableName: 'roles',
  underscored: true,
  timestamps: false,
})
export class Role extends Model<Role> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  name: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
