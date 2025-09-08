import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import databaseConfig from './config/database.config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { DepartmentsModule } from './departments/departments.module';
import { MessagesModule } from './messages/messages.module';
import { UserGuard } from './auth/guards/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { Ticket } from './tickets/entities/ticket.entity';
import { Department } from './departments/entities/department.entity';
import { Message } from './messages/entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        if (!dbConfig) {
          throw new Error('Database configuration not found');
        }
        return {
          type: 'postgres',
          host: dbConfig.host || 'localhost',
          port: dbConfig.port || 5432,
          username: dbConfig.username || 'postgres',
          password: dbConfig.password || 'password',
          database: dbConfig.database || 'mydb',
          entities: [User, Role, Ticket, Department, Message],
          synchronize: false,
        } as TypeOrmModuleOptions;
      },
    }),
    AuthModule,
    UsersModule,
    TicketsModule,
    DepartmentsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],
})
export class AppModule {}
