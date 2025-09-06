import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
  CreatedAt,
} from 'sequelize-typescript';

export enum AuditResultType {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
}

@Table({
  tableName: 'security_logs',
  underscored: true,
  timestamps: false,
})
export class SecurityLog extends Model<SecurityLog> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(AuditResultType)))
  eventResult: AuditResultType;

  @AllowNull(false)
  @Column(DataType.UUID)
  userId: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  username: string;

  @AllowNull(true)
  @Column(DataType.STRING(100))
  ipAddress: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  agent: string;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isVisibleToUser: boolean;

  @AllowNull(false)
  @Default(DataType.NOW)
  @CreatedAt
  @Column(DataType.DATE)
  timestamp: Date;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  index: number;
}
