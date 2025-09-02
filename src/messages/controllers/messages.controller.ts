import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../../users/entities/user.entity';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(UserGuard, RolesGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @Roles(UserRoleEnum.USER, UserRoleEnum.SUPPORT, UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createMessageDto: CreateMessageDto, @Req() req) {
    return this.messagesService.create(createMessageDto, req.user.userId);
  }

  @Get('ticket/:ticketId')
  @Roles(UserRoleEnum.USER, UserRoleEnum.SUPPORT, UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Retrieve all messages for a ticket' })
  @ApiResponse({
    status: 200,
    description: 'Returns all messages for the specified ticket.',
  })
  findAllByTicket(@Param('ticketId') ticketId: string) {
    return this.messagesService.findAllByTicket(+ticketId);
  }

  @Get(':id')
  @Roles(UserRoleEnum.USER, UserRoleEnum.SUPPORT, UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Retrieve a message by ID' })
  @ApiResponse({ status: 200, description: 'Returns the message.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a message by ID (Superadmin only)' })
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
