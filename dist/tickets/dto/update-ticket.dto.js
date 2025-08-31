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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTicketDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const ticket_entity_1 = require("../entities/ticket.entity");
class UpdateTicketDto {
    title;
    description;
    priority;
    status;
    supportId;
}
exports.UpdateTicketDto = UpdateTicketDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ticket title',
        example: 'Unable to login to my account',
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Title can be at most 255 characters long' }),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ticket description',
        example: 'I am unable to login to my account. I keep getting an error message.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ticket priority',
        example: 'medium',
        enum: ticket_entity_1.TicketPriority,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(ticket_entity_1.TicketPriority), {
        message: 'Priority must be one of: low, medium, high',
    }),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ticket status',
        example: 'in-progress',
        enum: ticket_entity_1.TicketStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(ticket_entity_1.TicketStatus), {
        message: 'Status must be one of: open, in-progress, closed, canceled by user',
    }),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Support user ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: 'Support ID must be a valid UUID' }),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "supportId", void 0);
//# sourceMappingURL=update-ticket.dto.js.map