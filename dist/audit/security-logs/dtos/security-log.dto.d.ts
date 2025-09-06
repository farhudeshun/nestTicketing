import { SearchAuditDto } from 'src/libs/types';
import { AuditResultType } from '../entities/security-log.entity';
export declare class SecurityLogDto {
    title: string;
    eventResult: AuditResultType;
    userId: string;
    username: string;
    ipAddress: string;
    agent: string;
    isVisibleToUser: boolean;
    timestamp: number;
}
export declare class SecurityLogResponseDto {
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
declare const SearchSecurityLogDto_base: import("@nestjs/common").Type<Omit<SearchAuditDto, "userId" | "id" | "name">>;
export declare class SearchSecurityLogDto extends SearchSecurityLogDto_base {
    title?: string;
    username?: string;
    ipAddress?: string;
    eventResult?: AuditResultType;
    sortBy?: string;
    sortOrder?: string;
}
export declare class SearchUserSecurityLogDto {
    offset?: number;
    limit?: number;
}
export {};
