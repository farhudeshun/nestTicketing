"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitModule = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const producer_service_1 = require("./producer.service");
const giftcard_shared_1 = require("@ngn-net/giftcard-shared");
const dotenv_1 = require("dotenv");
const constants_1 = require("../../libs/constants");
(0, dotenv_1.config)();
const rabbitUri = (0, constants_1.RABBIT_URI)();
let RabbitModule = class RabbitModule {
};
exports.RabbitModule = RabbitModule;
exports.RabbitModule = RabbitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot({
                exchanges: [
                    {
                        name: giftcard_shared_1.GiftCardExchange.PROVIDER_EVENT_EXCHANGE,
                        type: giftcard_shared_1.GiftCardExchange.PROVIDER_EVENT_EXCHANGE_TYPE,
                        createExchangeIfNotExists: true,
                    },
                    {
                        name: giftcard_shared_1.GiftCardExchange.AUDIT_LOG_EXCHANGE,
                        type: giftcard_shared_1.GiftCardExchange.AUDIT_LOG_EXCHANGE_TYPE,
                        createExchangeIfNotExists: true,
                    },
                    {
                        name: giftcard_shared_1.GiftCardExchange.USER_EXCHANGE,
                        type: giftcard_shared_1.GiftCardExchange.USER_EXCHANGE_TYPE,
                        createExchangeIfNotExists: true,
                    },
                ],
                uri: rabbitUri,
                enableControllerDiscovery: true,
                queues: [
                    {
                        name: process.env?.RABBIT_QUEUE,
                        createQueueIfNotExists: true,
                        options: { durable: true },
                    },
                ],
                connectionInitOptions: { wait: false },
            }),
        ],
        providers: [producer_service_1.ProducerService],
        exports: [nestjs_rabbitmq_1.RabbitMQModule, producer_service_1.ProducerService],
    })
], RabbitModule);
//# sourceMappingURL=rabbit.module.js.map