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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("../services/messages.service");
const create_message_dto_1 = require("../dto/create-message.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_entity_1 = require("../../users/entities/user.entity");
let MessagesController = class MessagesController {
    messagesService;
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    create(createMessageDto, req) {
        return this.messagesService.create(createMessageDto, req.user.userId);
    }
    findAllByTicket(ticketId) {
        return this.messagesService.findAllByTicket(+ticketId);
    }
    findOne(id) {
        return this.messagesService.findOne(+id);
    }
    remove(id) {
        return this.messagesService.remove(+id);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.USER, user_entity_1.UserRoleEnum.SUPPORT, user_entity_1.UserRoleEnum.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new message' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The message has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('ticket/:ticketId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.USER, user_entity_1.UserRoleEnum.SUPPORT, user_entity_1.UserRoleEnum.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all messages for a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all messages for the specified ticket.' }),
    __param(0, (0, common_1.Param)('ticketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "findAllByTicket", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.USER, user_entity_1.UserRoleEnum.SUPPORT, user_entity_1.UserRoleEnum.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a message by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the message.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Message not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRoleEnum.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a message by ID (Superadmin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The message has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Message not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "remove", null);
exports.MessagesController = MessagesController = __decorate([
    (0, swagger_1.ApiTags)('Messages'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map