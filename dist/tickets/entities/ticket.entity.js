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
exports.Ticket = exports.TicketPriority = exports.TicketStatus = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../users/entities/user.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
const message_entity_1 = require("../../messages/entities/message.entity");
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "open";
    TicketStatus["IN_PROGRESS"] = "in-progress";
    TicketStatus["CLOSED"] = "closed";
    TicketStatus["CANCELED_BY_USER"] = "canceled by user";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
var TicketPriority;
(function (TicketPriority) {
    TicketPriority["LOW"] = "low";
    TicketPriority["MEDIUM"] = "medium";
    TicketPriority["HIGH"] = "high";
})(TicketPriority || (exports.TicketPriority = TicketPriority = {}));
let Ticket = class Ticket extends sequelize_typescript_1.Model {
    id;
    title;
    description;
    status;
    priority;
    assignedDate;
    userId;
    supportId;
    departmentId;
    creator;
    support;
    department;
    messages;
    createdAt;
    updatedAt;
};
exports.Ticket = Ticket;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(TicketStatus.OPEN),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(TicketStatus))),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(TicketPriority.LOW),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(TicketPriority))),
    __metadata("design:type", String)
], Ticket.prototype, "priority", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Ticket.prototype, "assignedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Ticket.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Ticket.prototype, "supportId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => department_entity_1.Department),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Ticket.prototype, "departmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User, 'userId'),
    __metadata("design:type", user_entity_1.User)
], Ticket.prototype, "creator", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User, 'supportId'),
    __metadata("design:type", user_entity_1.User)
], Ticket.prototype, "support", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], Ticket.prototype, "department", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => message_entity_1.Message),
    __metadata("design:type", Array)
], Ticket.prototype, "messages", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Ticket.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
exports.Ticket = Ticket = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'tickets',
        underscored: true,
        timestamps: true,
    })
], Ticket);
//# sourceMappingURL=ticket.entity.js.map