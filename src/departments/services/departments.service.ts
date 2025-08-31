import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private departmentModel: typeof Department,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentModel.create(createDepartmentDto as any);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentModel.findAll();
  }

  async findOne(id: string): Promise<Department> {
    return this.departmentModel.findByPk(id);
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<[number, Department[]]> {
    return this.departmentModel.update(updateDepartmentDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: string): Promise<void> {
    const department = await this.findOne(id);
    await department.destroy();
  }
}

