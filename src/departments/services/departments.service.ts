import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { NotFoundException } from '@nestjs/common';

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

  async findById(id: string): Promise<Department | null> {
    return this.departmentModel.findByPk(id);
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<[number, Department[]]> {
    return this.departmentModel.update(updateDepartmentDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: string): Promise<void> {
    const department = await this.findById(id);
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
    await department.destroy();
  }
}
