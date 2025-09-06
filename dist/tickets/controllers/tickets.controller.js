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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("../services/tickets.service");
const create_ticket_dto_1 = require("../dto/create-ticket.dto");
const update_ticket_dto_1 = require("../dto/update-ticket.dto");
const assign_to_support_dto_1 = require("../dto/assign-to-support.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_entity_1 = require("../../users/entities/user.entity");
let TicketsController = class TicketsController {
    ticketsService;
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    create(createTicketDto, req) {
        return this.ticketsService.create(createTicketDto, req.user.userId);
    }
    findAll() {
        return this.ticketsService.findAll();
    }
    findOne(id) {
        return this.ticketsService.findOne(+id);
    }
    update(id, updateTicketDto) {
        return this.ticketsService.update(+id, updateTicketDto);
    }
    remove(id) {
        return this.ticketsService.remove(+id);
    }
    assignToSupport(ticketId, assignToSupportDto) {
        return this.ticketsService.assignToSupport(+ticketId, assignToSupportDto.supportId);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new ticket (User only)' }),
    (0, swagger_1.ApiBody)({
        type: create_ticket_dto_1.CreateTicketDto,
        examples: {
            example1: {
                summary: 'Sample ticket creation',
                value: {
                    title: 'Unable to login to my account',
                    description: 'I am unable to login to my account. I keep getting an error message.',
                    priority: 'medium',
                    departmentId: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The ticket has been successfully created.',
        schema: {
            example: {
                id: 1,
                title: 'Unable to login to my account',
                description: 'I am unable to login to my account. I keep getting an error message.',
                priority: 'medium',
                status: 'open',
                departmentId: '123e4567-e89b-12d3-a456-426614174000',
                userId: '123e4567-e89b-12d3-a456-426614174000',
                createdAt: '2025-09-06T10:00:00.000Z',
                updatedAt: '2025-09-06T10:00:00.000Z',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN, user_entity_1.UserRoleEnum.SUPPORT, user_entity_1.UserRoleEnum.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all tickets' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all tickets.',
        schema: {
            example: [
                {
                    id: 1,
                    title: 'Unable to login to my account',
                    description: 'I am unable to login to my account. I keep getting an error message.',
                    priority: 'medium',
                    status: 'open',
                    departmentId: '123e4567-e89b-12d3-a456-426614174000',
                    userId: '123e4567-e89b-12d3-a456-426614174000',
                    createdAt: '2025-09-06T10:00:00.000Z',
                    updatedAt: '2025-09-06T10:00:00.000Z',
                },
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN, user_entity_1.UserRoleEnum.SUPPORT, user_entity_1.UserRoleEnum.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a ticket by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the ticket.',
        schema: {
            example: {
                id: 1,
                title: 'Unable to login to my account',
                description: 'I am unable to login to my account. I keep getting an error message.',
                priority: 'medium',
                status: 'open',
                departmentId: '123e4567-e89b-12d3-a456-426614174000',
                userId: '123e4567-e89b-12d3-a456-426614174000',
                createdAt: '2025-09-06T10:00:00.000Z',
                updatedAt: '2025-09-06T10:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN, user_entity_1.UserRoleEnum.SUPPORT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a ticket by ID (Superadmin and Support only)',
    }),
    (0, swagger_1.ApiBody)({
        type: update_ticket_dto_1.UpdateTicketDto,
        examples: {
            example1: {
                summary: 'Update ticket info',
                value: {
                    title: 'Login issue resolved',
                    description: 'The user can now login successfully.',
                    priority: 'high',
                    status: 'in-progress',
                    supportId: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The ticket has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_dto_1.UpdateTicketDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a ticket by ID (Superadmin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The ticket has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN, user_entity_1.UserRoleEnum.SUPPORT),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign a ticket to a support user (Superadmin and Support only)',
    }),
    (0, swagger_1.ApiBody)({
        type: assign_to_support_dto_1.AssignToSupportDto,
        examples: {
            example1: {
                summary: 'Assign ticket to support',
                value: {
                    supportId: '123e4567-e89b-12d3-a456-426614174000',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The ticket has been successfully assigned.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_to_support_dto_1.AssignToSupportDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "assignToSupport", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('Tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.UserGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map