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
exports.SearchAuditDto = exports.getRoutingKeys = exports.ActionTypeItems = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const custom_validation_decorator_1 = require("./custom-validation.decorator");
exports.ActionTypeItems = [
    'CREATE',
    'EDIT',
    'DELETE',
    'RESTORE',
    'PERMANENT_DELETE',
];
const getRoutingKeys = () => {
    const rabbitenv = process.env.RABBIT_ENV ?? 'lcl';
    return {
        security_audit: `${rabbitenv}.security_audit`,
        security_setting: `${rabbitenv}.security_setting`,
        system_event: `${rabbitenv}.system_event`,
        user_audit: `${rabbitenv}.user`,
        provider_audit: `${rabbitenv}.provider_audit`,
        purchase_audit: `${rabbitenv}.purchase_audit`,
    };
};
exports.getRoutingKeys = getRoutingKeys;
class SearchAuditDto {
    offset;
    limit;
    dateFrom;
    dateTo;
    id;
    name;
    userId;
}
exports.SearchAuditDto = SearchAuditDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, custom_validation_decorator_1.CustomValidation)(validatePagination, {
        message: 'Offset must be greater than 0',
    }),
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", Number)
], SearchAuditDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, custom_validation_decorator_1.CustomValidation)(validatePagination, {
        message: 'Limit must be greater than 0 and less than 50',
    }),
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", Number)
], SearchAuditDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], SearchAuditDto.prototype, "dateFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], SearchAuditDto.prototype, "dateTo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ description: 'object id', required: false, type: String }),
    __metadata("design:type", Number)
], SearchAuditDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'object name', required: false, type: String }),
    __metadata("design:type", String)
], SearchAuditDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ description: 'operator user', required: false, type: String }),
    __metadata("design:type", Number)
], SearchAuditDto.prototype, "userId", void 0);
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
//# sourceMappingURL=types.js.map