"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
const role_entity_1 = require("../users/entities/role.entity");
const user_role_entity_1 = require("../users/entities/user-role.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const ticket_entity_1 = require("../tickets/entities/ticket.entity");
const message_entity_1 = require("../messages/entities/message.entity");
exports.default = (0, config_1.registerAs)('database', () => ({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME || 'sabi',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'nest',
    models: [user_entity_1.User, role_entity_1.Role, user_role_entity_1.UserRole, department_entity_1.Department, ticket_entity_1.Ticket, message_entity_1.Message],
    autoLoadModels: true,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
}));
//# sourceMappingURL=database.config.js.map