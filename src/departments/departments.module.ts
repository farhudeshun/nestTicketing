import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './entities/department.entity';
import { DepartmentsService } from './services/departments.service';
import { DepartmentsController } from './controllers/departments.controller';

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}

