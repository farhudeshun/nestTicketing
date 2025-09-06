import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CustomValidation } from 'src/libs/custom-validation.decorator';

function validatePagination(obj: SearchSystemEventDto) {
  if (obj.offset) {
    if (+obj.offset < 0) {
      return false;
    }
  }
  if (obj.limit) {
    if (+obj.limit < 0) {
      return false;
    }
    if (+obj.limit > 50) {
      return false;
    }
  }
  return true;
}
export class SystemEventDto {
  title: string;
  timestamp: number;
}
export class SystemEventResponseDto extends SystemEventDto {
  index: number;
  isValid: boolean;
}
export class SearchSystemEventDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, required: false })
  title?: string;
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  readonly dateFrom?: string;
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  readonly dateTo?: string;
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  sortOrder?: 'asc' | 'desc';
  @IsOptional()
  @IsString()
  @IsIn(['timestamp', 'title'])
  @ApiProperty({ enum: ['timestamp', 'title'], required: false })
  sortBy?: 'timestamp' | 'title';
  @IsOptional()
  @IsNumberString()
  @CustomValidation(validatePagination, {
    message: 'Offset must be greater than 0',
  })
  @ApiProperty({ type: Number, required: false })
  offset?: number;
  @IsOptional()
  @IsNumberString()
  @CustomValidation(validatePagination, {
    message: 'Limit must be greater than 0 and less than 50',
  })
  @ApiProperty({ type: Number, required: false })
  limit?: number;
}
