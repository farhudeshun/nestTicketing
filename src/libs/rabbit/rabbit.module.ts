import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { GiftCardExchange } from '@ngn-net/giftcard-shared';
import { config } from 'dotenv';
import { RABBIT_URI } from '../../libs/constants';
config();

const rabbitUri = RABBIT_URI();

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: GiftCardExchange.PROVIDER_EVENT_EXCHANGE,
          type: GiftCardExchange.PROVIDER_EVENT_EXCHANGE_TYPE,
          createExchangeIfNotExists: true,
        },
        {
          name: GiftCardExchange.AUDIT_LOG_EXCHANGE,
          type: GiftCardExchange.AUDIT_LOG_EXCHANGE_TYPE,
          createExchangeIfNotExists: true,
        },
        {
          name: GiftCardExchange.USER_EXCHANGE,
          type: GiftCardExchange.USER_EXCHANGE_TYPE,
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
  providers: [ProducerService],
  exports: [RabbitMQModule, ProducerService],
})
export class RabbitModule {}
