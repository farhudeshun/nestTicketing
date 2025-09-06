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
  ApiBody,
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
  @ApiBody({
    type: CreateMessageDto,
    examples: {
      example1: {
        summary: 'Create message example',
        value: {
          ticketId: 1,
          content: 'Hello, this is a test message',
          attachmentUrl: 'http://localhost:9000/messages/image.png',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
    schema: {
      example: {
        id: 1,
        ticketId: 1,
        content: 'Hello, this is a test message',
        attachmentUrl: 'http://localhost:9000/messages/image.png',
        userId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: '2025-09-06T10:00:00.000Z',
        updatedAt: '2025-09-06T10:00:00.000Z',
      },
    },
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
    schema: {
      example: [
        {
          id: 1,
          ticketId: 1,
          content: 'Hello, this is a test message',
          attachmentUrl: 'http://localhost:9000/messages/image.png',
          userId: '123e4567-e89b-12d3-a456-426614174000',
          createdAt: '2025-09-06T10:00:00.000Z',
          updatedAt: '2025-09-06T10:00:00.000Z',
        },
        {
          id: 2,
          ticketId: 1,
          content: 'Follow-up message',
          attachmentUrl: null,
          userId: '223e4567-e89b-12d3-a456-426614174001',
          createdAt: '2025-09-06T11:00:00.000Z',
          updatedAt: '2025-09-06T11:00:00.000Z',
        },
      ],
    },
  })
  findAllByTicket(@Param('ticketId') ticketId: string) {
    return this.messagesService.findAllByTicket(+ticketId);
  }

  @Get(':id')
  @Roles(UserRoleEnum.USER, UserRoleEnum.SUPPORT, UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Retrieve a message by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the message.',
    schema: {
      example: {
        id: 1,
        ticketId: 1,
        content: 'Hello, this is a test message',
        attachmentUrl: 'http://localhost:9000/messages/image.png',
        userId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: '2025-09-06T10:00:00.000Z',
        updatedAt: '2025-09-06T10:00:00.000Z',
      },
    },
  })
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
    schema: {
      example: {
        id: 1,
        ticketId: 1,
        content: 'Hello, this is a test message',
        attachmentUrl: 'http://localhost:9000/messages/image.png',
        userId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: '2025-09-06T10:00:00.000Z',
        updatedAt: '2025-09-06T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
