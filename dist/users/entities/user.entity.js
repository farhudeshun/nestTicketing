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
exports.User = exports.UserRoleEnum = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const department_entity_1 = require("../../departments/entities/department.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const message_entity_1 = require("../../messages/entities/message.entity");
const role_entity_1 = require("./role.entity");
const user_role_entity_1 = require("./user-role.entity");
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["SUPERADMIN"] = "superadmin";
    UserRoleEnum["SUPPORT"] = "support";
    UserRoleEnum["USER"] = "user";
    UserRoleEnum["EWANO"] = "ewano";
})(UserRoleEnum || (exports.UserRoleEnum = UserRoleEnum = {}));
let User = class User extends sequelize_typescript_1.Model {
    email;
    name;
    password;
    role;
    departmentId;
    department;
    createdTickets;
    assignedTickets;
    messages;
    roles;
};
exports.User = User;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(UserRoleEnum.USER),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(UserRoleEnum))),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => department_entity_1.Department),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], User.prototype, "departmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], User.prototype, "department", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ticket_entity_1.Ticket, 'userId'),
    __metadata("design:type", Array)
], User.prototype, "createdTickets", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ticket_entity_1.Ticket, 'supportId'),
    __metadata("design:type", Array)
], User.prototype, "assignedTickets", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => message_entity_1.Message),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => role_entity_1.Role, () => user_role_entity_1.UserRole),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'users',
        underscored: true,
        timestamps: true,
    })
], User);
//# sourceMappingURL=user.entity.js.map