import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SearchUserAuditDto } from './dtos/user.dto';
import { UsersService } from './services/user.service';

import { SuccessResponse } from 'src/libs/filters/http-exceptions';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { Request } from 'express';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  GiftCardExchange,
  MessagePattern,
  RoutingKeys,
  UserDto,
} from '@ngn-net/giftcard-shared';
import { UserGuard } from 'src//libs/auth.guard';

@UseGuards(UserGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'search user history' })
  @Get('')
  async getUserAudit(
    @Query() filters: SearchUserAuditDto,
    @Req() req: Request,
  ) {
    const result = await this.userService.getUserAudit(filters);
    return new SuccessResponse({ result: result.result, count: result.count });
  }

  @RabbitSubscribe({
    exchange: GiftCardExchange.USER_EXCHANGE,
    routingKey: RoutingKeys.USER_QUEUE,
    queue: 'giftcard-user-queue',
    queueOptions: { durable: true },
  })
  async onUserQueueMessage(message: MessagePattern<UserDto>) {
    console.log('message', message);
    if (message.messageType === 'create')
      await this.userService.addUser(message.data, message.message);
    else if (message.messageType === 'update')
      await this.userService.updateUser(message.data, message.message);
  }
}
