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
exports.Department = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
let Department = class Department extends sequelize_typescript_1.Model {
    name;
    users;
    tickets;
};
exports.Department = Department;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Department.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_entity_1.User),
    __metadata("design:type", Array)
], Department.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ticket_entity_1.Ticket),
    __metadata("design:type", Array)
], Department.prototype, "tickets", void 0);
exports.Department = Department = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'departments',
        underscored: true,
        timestamps: false,
    })
], Department);
//# sourceMappingURL=department.entity.js.map