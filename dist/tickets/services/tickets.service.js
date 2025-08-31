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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const ticket_entity_1 = require("../entities/ticket.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
let TicketsService = class TicketsService {
    ticketModel;
    constructor(ticketModel) {
        this.ticketModel = ticketModel;
    }
    async create(createTicketDto, userId) {
        return this.ticketModel.create({ ...createTicketDto, userId });
    }
    async findAll() {
        return this.ticketModel.findAll({
            include: [{ model: user_entity_1.User, as: 'creator' }, { model: user_entity_1.User, as: 'support' }, department_entity_1.Department],
        });
    }
    async findOne(id) {
        const ticket = await this.ticketModel.findByPk(id, {
            include: [{ model: user_entity_1.User, as: 'creator' }, { model: user_entity_1.User, as: 'support' }, department_entity_1.Department],
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with ID ${id} not found`);
        }
        return ticket;
    }
    async update(id, updateTicketDto) {
        const [affectedCount, affectedRows] = await this.ticketModel.update(updateTicketDto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Ticket with ID ${id} not found`);
        }
        return [affectedCount, affectedRows];
    }
    async remove(id) {
        const ticket = await this.findOne(id);
        await ticket.destroy();
    }
    async assignToSupport(ticketId, supportId) {
        const [affectedCount, affectedRows] = await this.ticketModel.update({ supportId, assignedDate: new Date() }, { where: { id: ticketId }, returning: true });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Ticket with ID ${ticketId} not found`);
        }
        return [affectedCount, affectedRows];
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [Object])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map