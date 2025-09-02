import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { CustomValidation } from './custom-validation.decorator';

export type ActionType =
  | 'CREATE'
  | 'EDIT'
  | 'DELETE'
  | 'RESTORE'
  | 'PERMANENT_DELETE';
export const ActionTypeItems = [
  'CREATE',
  'EDIT',
  'DELETE',
  'RESTORE',
  'PERMANENT_DELETE',
];

export const getRoutingKeys = () => {
  const rabbitenv = process.env.RABBIT_ENV ?? 'lcl';
  return {
    security_audit: `${rabbitenv}.security_audit`,
    security_setting: `${rabbitenv}.security_setting`,
    system_event: `${rabbitenv}.system_event`,
    //==================================
    user_audit: `${rabbitenv}.user`,
    provider_audit: `${rabbitenv}.provider_audit`,
    purchase_audit: `${rabbitenv}.purchase_audit`,
  };
};

export class SearchAuditDto {
  @IsOptional()
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

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false, type: String })
  readonly dateFrom?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false, type: String })
  readonly dateTo?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ description: 'object id', required: false, type: String })
  id?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'object name', required: false, type: String })
  name?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ description: 'operator user', required: false, type: String })
  userId?: number;
}

function validatePagination(obj: SearchAuditDto) {
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
