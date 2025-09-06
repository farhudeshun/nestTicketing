import { Department } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
export declare class DepartmentsService {
    private departmentModel;
    constructor(departmentModel: typeof Department);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    findAll(): Promise<Department[]>;
    findById(id: string): Promise<Department | null>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<[number, Department[]]>;
    remove(id: string): Promise<void>;
}
