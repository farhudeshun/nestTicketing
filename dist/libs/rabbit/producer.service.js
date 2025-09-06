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
exports.ProducerService = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const security_log_entity_1 = require("../../audit/security-logs/entities/security-log.entity");
const giftcard_shared_1 = require("@ngn-net/giftcard-shared");
const crypto_1 = require("crypto");
let ProducerService = class ProducerService {
    amqpConnection;
    constructor(amqpConnection) {
        this.amqpConnection = amqpConnection;
    }
    async publish(exchange, routingKey, message) {
        await this.amqpConnection.publish(exchange, routingKey, message);
    }
    async publishAuditLog(message) {
        const dto = {
            messageType: 'create',
            data: message,
            tId: (0, crypto_1.randomUUID)(),
        };
        await this.publish(giftcard_shared_1.GiftCardExchange.AUDIT_LOG_EXCHANGE, giftcard_shared_1.RoutingKeys.AUDIT_LOG_QUEUE, dto);
    }
    async publishSystemEvent(message) {
        console.log('publishSystemEvent', message);
        const dto = {
            messageType: 'create',
            data: message,
            tId: (0, crypto_1.randomUUID)(),
        };
        await this.publish(giftcard_shared_1.GiftCardExchange.AUDIT_LOG_EXCHANGE, giftcard_shared_1.RoutingKeys.SYSTEM_EVENT_QUEUE, dto);
    }
    async publishReadSecurityLogs(user, req) {
        const ip = req.headers['x-forwarded-for'] || req.ip;
        const securityLog = {
            title: `Read security logs. path: ${req.method} ${req.url}`,
            timestamp: Date.now(),
            eventResult: security_log_entity_1.AuditResultType.SUCCESSFUL,
            userId: user.sub,
            username: user.username,
            ipAddress: ip,
            agent: req.headers['user-agent'] || 'unknown',
            isVisibleToUser: false,
        };
        await this.publishAuditLog(securityLog);
    }
    async sendForbiddenAccessEvent(user, req) {
        const ip = req.headers['x-forwarded-for'] || req.ip;
        const securityLog = {
            title: `Forbidden access. path: ${req.method} ${req.url}`,
            timestamp: Date.now(),
            eventResult: security_log_entity_1.AuditResultType.FAILED,
            userId: user.sub,
            username: user.username,
            ipAddress: ip,
            agent: req.headers['user-agent'] || 'unknown',
            isVisibleToUser: false,
        };
        await this.publishAuditLog(securityLog);
    }
};
exports.ProducerService = ProducerService;
exports.ProducerService = ProducerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_rabbitmq_1.AmqpConnection])
], ProducerService);
//# sourceMappingURL=producer.service.js.map