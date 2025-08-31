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
const sequelize_1 = require("@nestjs/sequelize");
const message_entity_1 = require("../entities/message.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
let MessagesService = class MessagesService {
    messageModel;
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async create(createMessageDto, userId) {
        return this.messageModel.create({ ...createMessageDto, userId });
    }
    async findAllByTicket(ticketId) {
        return this.messageModel.findAll({
            where: { ticketId },
            include: [user_entity_1.User, ticket_entity_1.Ticket],
            order: [['createdAt', 'ASC']],
        });
    }
    async findOne(id) {
        const message = await this.messageModel.findByPk(id, {
            include: [user_entity_1.User, ticket_entity_1.Ticket],
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        return message;
    }
    async remove(id) {
        const message = await this.findOne(id);
        await message.destroy();
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(message_entity_1.Message)),
    __metadata("design:paramtypes", [Object])
], MessagesService);
//# sourceMappingURL=messages.service.js.map