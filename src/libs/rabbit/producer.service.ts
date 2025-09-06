import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { SystemEventDto } from 'src/audit/security-logs/dtos/system-event.dto';
import { SecurityLogDto } from 'src/audit/security-logs/dtos/security-log.dto';
import { Request } from 'express';
import { AuditResultType } from 'src/audit/security-logs/entities/security-log.entity';
import {
  GiftCardExchange,
  MessagePattern,
  RoutingKeys,
} from '@ngn-net/giftcard-shared';
import { randomUUID } from 'crypto';
import { JwtPayload } from '../auth.guard';

@Injectable()
export class ProducerService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(exchange: string, routingKey: string, message: any) {
    await this.amqpConnection.publish(exchange, routingKey, message);
  }

  async publishAuditLog(message: SecurityLogDto) {
    const dto: MessagePattern<SecurityLogDto> = {
      messageType: 'create',
      data: message,
      tId: randomUUID(),
    };
    await this.publish(
      GiftCardExchange.AUDIT_LOG_EXCHANGE,
      RoutingKeys.AUDIT_LOG_QUEUE,
      dto,
    );
  }
  async publishSystemEvent(message: SystemEventDto) {
    console.log('publishSystemEvent', message);
    const dto: MessagePattern<SystemEventDto> = {
      messageType: 'create',
      data: message,
      tId: randomUUID(),
    };
    await this.publish(
      GiftCardExchange.AUDIT_LOG_EXCHANGE,
      RoutingKeys.SYSTEM_EVENT_QUEUE,
      dto,
    );
  }
  async publishReadSecurityLogs(user: JwtPayload, req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.ip;
    const securityLog: SecurityLogDto = {
      title: `Read security logs. path: ${req.method} ${req.url}`,
      timestamp: Date.now(),
      eventResult: AuditResultType.SUCCESSFUL,
      userId: user.sub,
      username: user.username,
      ipAddress: ip as string,
      agent: req.headers['user-agent'] || 'unknown',
      isVisibleToUser: false,
    };
    await this.publishAuditLog(securityLog);
  }
  async sendForbiddenAccessEvent(user: JwtPayload, req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.ip;
    const securityLog: SecurityLogDto = {
      title: `Forbidden access. path: ${req.method} ${req.url}`,
      timestamp: Date.now(),
      eventResult: AuditResultType.FAILED,
      userId: user.sub,
      username: user.username,
      ipAddress: ip as string,
      agent: req.headers['user-agent'] || 'unknown',
      isVisibleToUser: false,
    };
    await this.publishAuditLog(securityLog);
  }
}
