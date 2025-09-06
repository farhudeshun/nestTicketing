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
exports.SearchSystemEventDto = exports.SystemEventResponseDto = exports.SystemEventDto = void 0;
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
class SystemEventDto {
    title;
    timestamp;
}
exports.SystemEventDto = SystemEventDto;
class SystemEventResponseDto extends SystemEventDto {
    index;
    isValid;
}
exports.SystemEventResponseDto = SystemEventResponseDto;
class SearchSystemEventDto {
    title;
    dateFrom;
    dateTo;
    sortOrder;
    sortBy;
    offset;
    limit;
}
exports.SearchSystemEventDto = SearchSystemEventDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], SearchSystemEventDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SearchSystemEventDto.prototype, "dateFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SearchSystemEventDto.prototype, "dateTo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    (0, swagger_1.ApiProperty)({ enum: ['asc', 'desc'], required: false }),
    __metadata("design:type", String)
], SearchSystemEventDto.prototype, "sortOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['timestamp', 'title']),
    (0, swagger_1.ApiProperty)({ enum: ['timestamp', 'title'], required: false }),
    __metadata("design:type", String)
], SearchSystemEventDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, custom_validation_decorator_1.CustomValidation)(validatePagination, {
        message: 'Offset must be greater than 0',
    }),
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    __metadata("design:type", Number)
], SearchSystemEventDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, custom_validation_decorator_1.CustomValidation)(validatePagination, {
        message: 'Limit must be greater than 0 and less than 50',
    }),
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    __metadata("design:type", Number)
], SearchSystemEventDto.prototype, "limit", void 0);
//# sourceMappingURL=system-event.dto.js.map