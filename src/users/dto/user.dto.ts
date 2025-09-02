import { UserDto, UserSource, userState } from '@ngn-net/giftcard-shared';
import { ActionType, SearchAuditDto } from 'src/libs/types';

export class AddUserDto implements UserDto {
  id: string;
  userid: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  username?: string;
  status: userState;
  source: UserSource;
  createdAt: Date;
  updatedAt: Date;
}

export class SearchUserAuditDto extends SearchAuditDto {}
