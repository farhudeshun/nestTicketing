import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/entities/role.entity';
import { Department } from '../departments/entities/department.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Message } from '../messages/entities/message.entity';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME || 'sabi',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'nest',
    entities: [User, Role, Department, Ticket, Message],
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  }),
);
