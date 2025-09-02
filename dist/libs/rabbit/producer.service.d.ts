import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SystemEventDto } from 'src/audit/security-logs/dtos/system-event.dto';
import { SecurityLogDto } from 'src/audit/security-logs/dtos/security-log.dto';
import { Request } from 'express';
import { JwtPayload } from '../auth.guard';
export declare class ProducerService {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    publish(exchange: string, routingKey: string, message: any): Promise<void>;
    publishAuditLog(message: SecurityLogDto): Promise<void>;
    publishSystemEvent(message: SystemEventDto): Promise<void>;
    publishReadSecurityLogs(user: JwtPayload, req: Request): Promise<void>;
    sendForbiddenAccessEvent(user: JwtPayload, req: Request): Promise<void>;
}
