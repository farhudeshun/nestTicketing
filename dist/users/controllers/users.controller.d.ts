import { SearchUserAuditDto } from './dtos/user.dto';
import { UsersService } from './services/user.service';
import { Request } from 'express';
import { MessagePattern, UserDto } from '@ngn-net/giftcard-shared';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    getUserAudit(filters: SearchUserAuditDto, req: Request): Promise<any>;
    onUserQueueMessage(message: MessagePattern<UserDto>): Promise<void>;
}
