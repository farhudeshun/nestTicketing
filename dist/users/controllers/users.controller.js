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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dtos/user.dto");
const user_service_1 = require("./services/user.service");
const http_exception_1 = require("src/lib/filters/http-exception");
const swagger_1 = require("@nestjs/swagger");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const giftcard_shared_1 = require("@ngn-net/giftcard-shared");
const auth_guard_1 = require("src/lib/auth.guard");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getUserAudit(filters, req) {
        const result = await this.userService.getUserAudit(filters);
        return new http_exception_1.SuccessResponse({ result: result.result, count: result.count });
    }
    async onUserQueueMessage(message) {
        console.log('message', message);
        if (message.messageType === 'create')
            await this.userService.addUser(message.data, message.message);
        else if (message.messageType === 'update')
            await this.userService.updateUser(message.data, message.message);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'search user history' }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.SearchUserAuditDto !== "undefined" && user_dto_1.SearchUserAuditDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserAudit", null);
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: giftcard_shared_1.GiftCardExchange.USER_EXCHANGE,
        routingKey: giftcard_shared_1.RoutingKeys.USER_QUEUE,
        queue: 'giftcard-user-queue',
        queueOptions: { durable: true },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "onUserQueueMessage", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.UserGuard),
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UsersService !== "undefined" && user_service_1.UsersService) === "function" ? _a : Object])
], UserController);
//# sourceMappingURL=users.controller.js.map