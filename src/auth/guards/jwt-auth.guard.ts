import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';

import { config } from 'dotenv';
config();
export interface JwtPayload {
  sub: string;
  username: string;
  jti: string;
  exp: number;
  roles: string[];
}

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      if (!request.headers.authorization)
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      const bearer = request.headers.authorization.split(' ')[1];
      request.auth = jsonwebtoken.decode(bearer) as JwtPayload;
      const payload: JwtPayload = request.auth;
      if (payload.roles.includes('refresh_token'))
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

export const AuthUserId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    try {
      const auth = ctx.switchToHttp().getRequest().auth;
      // if(DEV_USER_ID) return DEV_USER_ID;
      return auth;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
  },
);

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    try {
      const auth: JwtPayload = ctx.switchToHttp().getRequest().auth;
      return auth;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
  },
);
