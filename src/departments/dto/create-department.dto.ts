import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'The name of the department',
    example: 'Office',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Department name is required' })
  @IsString()
  @MaxLength(100, { message: 'Department name can be at most 100 characters long' })
  name: string;
}

