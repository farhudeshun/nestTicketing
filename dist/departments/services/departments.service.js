"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("../entities/department.entity");
let DepartmentsService = class DepartmentsService {
    departmentRepo;
    constructor(departmentRepo) {
        this.departmentRepo = departmentRepo;
    }
    async create(createDepartmentDto) {
        const department = this.departmentRepo.create(createDepartmentDto);
        return this.departmentRepo.save(department);
    }
    async findAll() {
        return this.departmentRepo.find();
    }
    async findById(id) {
        return this.departmentRepo.findOne({ where: { id } });
    }
    async update(id, updateDepartmentDto) {
        const department = await this.findById(id);
        if (!department) {
            throw new common_1.NotFoundException(`Department with id ${id} not found`);
        }
        const updated = Object.assign(department, updateDepartmentDto);
        return this.departmentRepo.save(updated);
    }
    async remove(id) {
        const department = await this.findById(id);
        if (!department) {
            throw new common_1.NotFoundException(`Department with id ${id} not found`);
        }
        await this.departmentRepo.remove(department);
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map