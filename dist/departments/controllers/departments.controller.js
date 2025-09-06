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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("../services/departments.service");
const create_department_dto_1 = require("../dto/create-department.dto");
const update_department_dto_1 = require("../dto/update-department.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_entity_1 = require("../../users/entities/user.entity");
let DepartmentsController = class DepartmentsController {
    departmentsService;
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    create(createDepartmentDto) {
        return this.departmentsService.create(createDepartmentDto);
    }
    findAll() {
        return this.departmentsService.findAll();
    }
    findOne(id) {
        return this.departmentsService.findById(id);
    }
    update(id, updateDepartmentDto) {
        return this.departmentsService.update(id, updateDepartmentDto);
    }
    remove(id) {
        return this.departmentsService.remove(id);
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new department (Superadmin only)' }),
    (0, swagger_1.ApiBody)({
        type: create_department_dto_1.CreateDepartmentDto,
        examples: {
            example1: {
                summary: 'Sample department creation',
                value: {
                    name: 'Office',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The department has been successfully created.',
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Office',
                createdAt: '2025-09-06T10:00:00.000Z',
                updatedAt: '2025-09-06T10:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all departments' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all departments.',
        schema: {
            example: [
                {
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Office',
                    createdAt: '2025-09-06T10:00:00.000Z',
                    updatedAt: '2025-09-06T10:00:00.000Z',
                },
                {
                    id: '223e4567-e89b-12d3-a456-426614174001',
                    name: 'HR',
                    createdAt: '2025-09-06T10:05:00.000Z',
                    updatedAt: '2025-09-06T10:05:00.000Z',
                },
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a department by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the department.',
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Office',
                createdAt: '2025-09-06T10:00:00.000Z',
                updatedAt: '2025-09-06T10:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Department not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a department by ID (Superadmin only)' }),
    (0, swagger_1.ApiBody)({
        type: update_department_dto_1.UpdateDepartmentDto,
        examples: {
            example1: {
                summary: 'Update department name',
                value: {
                    name: 'New Office Name',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The department has been successfully updated.',
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'New Office Name',
                createdAt: '2025-09-06T10:00:00.000Z',
                updatedAt: '2025-09-06T11:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Department not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a department by ID (Superadmin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The department has been successfully deleted.',
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Office',
                createdAt: '2025-09-06T10:00:00.000Z',
                updatedAt: '2025-09-06T10:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Department not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "remove", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, swagger_1.ApiTags)('Departments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.UserGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map