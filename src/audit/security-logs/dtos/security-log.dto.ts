import { SearchAuditDto } from 'src/libs/types';
import { AuditResultType } from '../entities/security-log.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { CustomValidation } from 'src/libs/custom-validation.decorator';
function validatePagination(obj: SearchUserSecurityLogDto) {
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
export class SecurityLogDto {
  title: string;
  eventResult: AuditResultType;
  userId: string;
  username: string;
  ipAddress: string;
  agent: string;
  isVisibleToUser: boolean;
  timestamp: number;
}
export class SecurityLogResponseDto {
  title: string;
  eventResult: AuditResultType;
  userId: string;
  username: string;
  ipAddress: string;
  agent: string;
  timestamp: number;
  isValid: boolean;
  index: number;
}

export class SearchSecurityLogDto extends OmitType(SearchAuditDto, [
  'userId',
  'id',
  'name',
]) {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'title', required: false })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'user name', required: false })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'ip address', required: false })
  ipAddress?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'event result',
    enum: AuditResultType,
    required: false,
  })
  eventResult?: AuditResultType;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'sort by',
    required: false,
    enum: ['timestamp', 'username', 'ipAddress', 'eventResult', 'title'],
    default: 'timestamp',
  })
  @IsIn(['timestamp', 'username', 'ipAddress', 'eventResult', 'title'])
  sortBy?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'sort order',
    required: false,
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsIn(['asc', 'desc'])
  sortOrder?: string;
}
export class SearchUserSecurityLogDto {
  @IsNumberString()
  @CustomValidation(validatePagination, {
    message: 'Offset must be greater than 0',
  })
  @ApiProperty({ required: false, type: String })
  offset?: number;

  @IsOptional()
  @IsNumberString()
  @CustomValidation(validatePagination, {
    message: 'Limit must be greater than 0 and less than 50',
  })
  @ApiProperty({ required: false, type: String })
  limit?: number;
}
