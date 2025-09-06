"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserSecurityLogDto = exports.SearchSecurityLogDto = exports.SecurityLogResponseDto = exports.SecurityLogDto = void 0;
const types_1 = require("../../../libs/types");
const security_log_entity_1 = require("../entities/security-log.entity");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const custom_validation_decorator_1 = require("../../../libs/custom-validation.decorator");
function validatePagination(obj) {
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
class SecurityLogDto {
    title;
    eventResult;
    userId;
    username;
    ipAddress;
    agent;
    isVisibleToUser;
    timestamp;
}
exports.SecurityLogDto = SecurityLogDto;
class SecurityLogResponseDto {
    title;
    eventResult;
    userId;
    username;
    ipAddress;
    agent;
    timestamp;
    isValid;
    index;
}
exports.SecurityLogResponseDto = SecurityLogResponseDto;
class SearchSecurityLogDto extends (0, swagger_1.OmitType)(types_1.SearchAuditDto, [
    'userId',
    'id',
    'name',
]) {
    title;
    username;
    ipAddress;
    eventResult;
    sortBy;
    sortOrder;
}
exports.SearchSecurityLogDto = SearchSecurityLogDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'title', required: false }),
    __metadata("design:type", String)
], SearchSecurityLogDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'user name', required: false }),
    __metadata("design:type", String)
], SearchSecurityLogDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'ip address', required: false }),
    __metadata("design:type", String)
], SearchSecurityLogDto.prototype, "ipAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'event result',
        enum: security_log_entity_1.AuditResultType,
        required: false,
    }),
    __metadata("design:type", String)
], SearchSecurityLogDto.prototype, "eventResult", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'sort by',
        required: false,
        enum: ['timestamp', 'username', 'ipAddress', 'eventResult', 'title'],
        default: 'timestamp',
    }),
    (0, class_validator_1.IsIn)(['timestamp', 'username', 'ipAddress', 'eventResult', 'title']),
    __metadata("design:type", String)
], SearchSecurityLogDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'sort order',
        required: false,
        enum: ['asc', 'desc'],
        default: 'desc',
    }),
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    __metadata("design:type", String)
], SearchSecurityLogDto.prototype, "sortOrder", void 0);
class SearchUserSecurityLogDto {
    offset;
    limit;
}
exports.SearchUserSecurityLogDto = SearchUserSecurityLogDto;
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, custom_validation_decorator_1.CustomValidation)(validatePagination, {
        message: 'Offset must be greater than 0',
    }),
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", Number)
], SearchUserSecurityLogDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, custom_validation_decorator_1.CustomValidation)(validatePagination, {
        message: 'Limit must be greater than 0 and less than 50',
    }),
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", Number)
], SearchUserSecurityLogDto.prototype, "limit", void 0);
//# sourceMappingURL=security-log.dto.js.map