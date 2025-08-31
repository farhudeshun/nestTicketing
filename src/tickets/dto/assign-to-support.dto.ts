import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignToSupportDto {
  @ApiProperty({
    description: 'Support user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Support ID is required' })
  @IsUUID(4, { message: 'Support ID must be a valid UUID' })
  supportId: string;
}

