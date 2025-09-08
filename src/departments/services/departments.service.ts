import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepo.create(createDepartmentDto);
    return this.departmentRepo.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepo.find();
  }

  async findById(id: number): Promise<Department | null> {
    return this.departmentRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.findById(id);
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
    const updated = Object.assign(department, updateDepartmentDto);
    return this.departmentRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const department = await this.findById(id);
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
    await this.departmentRepo.remove(department);
  }
}
