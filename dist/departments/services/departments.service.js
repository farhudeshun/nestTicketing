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
const sequelize_1 = require("@nestjs/sequelize");
const department_entity_1 = require("../entities/department.entity");
const common_2 = require("@nestjs/common");
let DepartmentsService = class DepartmentsService {
    departmentModel;
    constructor(departmentModel) {
        this.departmentModel = departmentModel;
    }
    async create(createDepartmentDto) {
        return this.departmentModel.create(createDepartmentDto);
    }
    async findAll() {
        return this.departmentModel.findAll();
    }
    async findById(id) {
        return this.departmentModel.findByPk(id);
    }
    async update(id, updateDepartmentDto) {
        return this.departmentModel.update(updateDepartmentDto, {
            where: { id },
            returning: true,
        });
    }
    async remove(id) {
        const department = await this.findById(id);
        if (!department) {
            throw new common_2.NotFoundException(`Department with id ${id} not found`);
        }
        await department.destroy();
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(department_entity_1.Department)),
    __metadata("design:paramtypes", [Object])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map