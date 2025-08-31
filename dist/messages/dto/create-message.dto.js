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
exports.CreateMessageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMessageDto {
    ticketId;
    content;
    attachmentUrl;
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ticket ID',
        example: 1,
        type: 'integer',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ticket ID is required' }),
    (0, class_validator_1.IsInt)({ message: 'Ticket ID must be an integer' }),
    __metadata("design:type", Number)
], CreateMessageDto.prototype, "ticketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message content',
        example: 'Hello, this is a test message',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Content is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Attachment URL',
        example: 'http://localhost:9000/messages/image.png',
        format: 'url',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'Attachment URL must be a valid URL' }),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "attachmentUrl", void 0);
//# sourceMappingURL=create-message.dto.js.map