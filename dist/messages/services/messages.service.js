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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../entities/message.entity");
let MessagesService = class MessagesService {
    messageRepo;
    constructor(messageRepo) {
        this.messageRepo = messageRepo;
    }
    async create(createMessageDto, userId) {
        const message = this.messageRepo.create({
            ...createMessageDto,
            user: { id: userId },
        });
        return await this.messageRepo.save(message);
    }
    async findAllByTicket(ticketId) {
        return this.messageRepo.find({
            where: { ticket: { id: ticketId } },
            relations: ['user', 'ticket'],
            order: { createdAt: 'ASC' },
        });
    }
    async findOne(id) {
        const message = await this.messageRepo.findOne({
            where: { id },
            relations: ['user', 'ticket'],
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        return message;
    }
    async remove(id) {
        const result = await this.messageRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map