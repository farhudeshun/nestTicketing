import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { AssignToSupportDto } from '../dto/assign-to-support.dto';
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

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(UserGuard, RolesGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles(UserRoleEnum.USER)
  @ApiOperation({ summary: 'Create a new ticket (User only)' })
  @ApiResponse({
    status: 201,
    description: 'The ticket has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createTicketDto: CreateTicketDto, @Req() req) {
    return this.ticketsService.create(createTicketDto, req.user.userId);
  }

  @Get()
  @Roles(UserRoleEnum.SUPERADMIN, UserRoleEnum.SUPPORT, UserRoleEnum.USER)
  @ApiOperation({ summary: 'Retrieve all tickets' })
  @ApiResponse({ status: 200, description: 'Returns all tickets.' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @Roles(UserRoleEnum.SUPERADMIN, UserRoleEnum.SUPPORT, UserRoleEnum.USER)
  @ApiOperation({ summary: 'Retrieve a ticket by ID' })
  @ApiResponse({ status: 200, description: 'Returns the ticket.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.SUPERADMIN, UserRoleEnum.SUPPORT)
  @ApiOperation({
    summary: 'Update a ticket by ID (Superadmin and Support only)',
  })
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a ticket by ID (Superadmin only)' })
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }

  @Patch(':id/assign')
  @Roles(UserRoleEnum.SUPERADMIN, UserRoleEnum.SUPPORT)
  @ApiOperation({
    summary: 'Assign a ticket to a support user (Superadmin and Support only)',
  })
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully assigned.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  assignToSupport(
    @Param('id') ticketId: string,
    @Body() assignToSupportDto: AssignToSupportDto,
  ) {
    return this.ticketsService.assignToSupport(
      +ticketId,
      assignToSupportDto.supportId,
    );
  }
}
