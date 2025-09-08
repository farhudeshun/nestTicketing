"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const database_config_1 = __importDefault(require("./config/database.config"));
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const tickets_module_1 = require("./tickets/tickets.module");
const departments_module_1 = require("./departments/departments.module");
const messages_module_1 = require("./messages/messages.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./users/entities/user.entity");
const role_entity_1 = require("./users/entities/role.entity");
const ticket_entity_1 = require("./tickets/entities/ticket.entity");
const department_entity_1 = require("./departments/entities/department.entity");
const message_entity_1 = require("./messages/entities/message.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default],
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const dbConfig = configService.get('database');
                    if (!dbConfig) {
                        throw new Error('Database configuration not found');
                    }
                    return {
                        type: 'postgres',
                        host: dbConfig.host || 'localhost',
                        port: dbConfig.port || 5432,
                        username: dbConfig.username || 'postgres',
                        password: dbConfig.password || 'password',
                        database: dbConfig.database || 'mydb',
                        entities: [user_entity_1.User, role_entity_1.Role, ticket_entity_1.Ticket, department_entity_1.Department, message_entity_1.Message],
                        synchronize: false,
                    };
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            tickets_module_1.TicketsModule,
            departments_module_1.DepartmentsModule,
            messages_module_1.MessagesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.UserGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map