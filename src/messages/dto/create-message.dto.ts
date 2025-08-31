import { IsNotEmpty, IsString, IsInt, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Ticket ID',
    example: 1,
    type: 'integer',
  })
  @IsNotEmpty({ message: 'Ticket ID is required' })
  @IsInt({ message: 'Ticket ID must be an integer' })
  ticketId: number;

  @ApiProperty({
    description: 'Message content',
    example: 'Hello, this is a test message',
  })
  @IsNotEmpty({ message: 'Content is required' })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'Attachment URL',
    example: 'http://localhost:9000/messages/image.png',
    format: 'url',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Attachment URL must be a valid URL' })
  attachmentUrl?: string;
}

