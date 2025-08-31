import { IsNotEmpty, IsString, MaxLength, IsIn, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketPriority } from '../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Ticket title',
    example: 'Unable to login to my account',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  @MaxLength(255, { message: 'Title can be at most 255 characters long' })
  title: string;

  @ApiProperty({
    description: 'Ticket description',
    example: 'I am unable to login to my account. I keep getting an error message.',
    maxLength: 1000,
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  @MaxLength(1000, { message: 'Description can be at most 1000 characters long' })
  description: string;

  @ApiProperty({
    description: 'Ticket priority',
    example: 'medium',
    enum: TicketPriority,
  })
  @IsNotEmpty({ message: 'Priority is required' })
  @IsIn(Object.values(TicketPriority), {
    message: 'Priority must be one of: low, medium, high',
  })
  priority: TicketPriority;

  @ApiProperty({
    description: 'Department ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Department ID is required' })
  @IsUUID(4, { message: 'Department ID must be a valid UUID' })
  departmentId: string;
}

