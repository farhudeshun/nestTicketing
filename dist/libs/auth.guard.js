"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = exports.AuthUserId = exports.UserGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken = __importStar(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let UserGuard = class UserGuard {
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            if (!request.headers.authorization)
                throw new common_1.HttpException('UNAUTHORIZED', common_1.HttpStatus.UNAUTHORIZED);
            const bearer = request.headers.authorization.split(' ')[1];
            request.auth = jsonwebtoken.decode(bearer);
            const payload = request.auth;
            if (payload.roles.includes('refresh_token'))
                throw new common_1.HttpException('UNAUTHORIZED', common_1.HttpStatus.UNAUTHORIZED);
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.UserGuard = UserGuard;
exports.UserGuard = UserGuard = __decorate([
    (0, common_1.Injectable)()
], UserGuard);
exports.AuthUserId = (0, common_1.createParamDecorator)((data, ctx) => {
    try {
        const auth = ctx.switchToHttp().getRequest().auth;
        return auth;
    }
    catch (error) {
        throw new common_1.HttpException('Forbidden', common_1.HttpStatus.UNAUTHORIZED);
    }
});
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    try {
        const auth = ctx.switchToHttp().getRequest().auth;
        return auth;
    }
    catch (error) {
        throw new common_1.HttpException('Forbidden', common_1.HttpStatus.UNAUTHORIZED);
    }
});
//# sourceMappingURL=auth.guard.js.map