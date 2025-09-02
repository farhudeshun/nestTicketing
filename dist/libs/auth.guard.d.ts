import { CanActivate, ExecutionContext } from '@nestjs/common';
export interface JwtPayload {
    sub: string;
    username: string;
    jti: string;
    exp: number;
    roles: string[];
}
export declare class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const AuthUserId: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export declare const GetUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
