import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { UsersService } from './services/users.service';
import { UserController } from './controllers/users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
