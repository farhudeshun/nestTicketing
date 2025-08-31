import { IsOptional, IsString, IsIn, IsUUID, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TicketPriority, TicketStatus } from '../entities/ticket.entity';

export class UpdateTicketDto {
  @ApiPropertyOptional({
    description: 'Ticket title',
    example: 'Unable to login to my account',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Title can be at most 255 characters long' })
  title?: string;

  @ApiPropertyOptional({
    description: 'Ticket description',
    example: 'I am unable to login to my account. I keep getting an error message.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Ticket priority',
    example: 'medium',
    enum: TicketPriority,
  })
  @IsOptional()
  @IsIn(Object.values(TicketPriority), {
    message: 'Priority must be one of: low, medium, high',
  })
  priority?: TicketPriority;

  @ApiPropertyOptional({
    description: 'Ticket status',
    example: 'in-progress',
    enum: TicketStatus,
  })
  @IsOptional()
  @IsIn(Object.values(TicketStatus), {
    message: 'Status must be one of: open, in-progress, closed, canceled by user',
  })
  status?: TicketStatus;

  @ApiPropertyOptional({
    description: 'Support user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Support ID must be a valid UUID' })
  supportId?: string;
}

