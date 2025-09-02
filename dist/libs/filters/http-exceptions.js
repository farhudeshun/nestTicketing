"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomExceptionFilter = exports.SuccessResponse = exports.ErrorResponse = exports.JsonResponse = void 0;
const common_1 = require("@nestjs/common");
class JsonResponse {
    hasError;
    message;
    data;
    constructor(hasError, message, data) {
        this.hasError = hasError;
        this.message = message;
        this.data = data;
    }
}
exports.JsonResponse = JsonResponse;
class ErrorResponse extends JsonResponse {
    constructor(message, data) {
        super(true, message, data);
    }
}
exports.ErrorResponse = ErrorResponse;
class SuccessResponse extends JsonResponse {
    constructor(data, message = 'OK') {
        super(false, message, data);
    }
}
exports.SuccessResponse = SuccessResponse;
let CustomExceptionFilter = class CustomExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let errorResponse = exception.getResponse();
        if (!(errorResponse instanceof ErrorResponse)) {
            errorResponse = new ErrorResponse(errorResponse.message);
        }
        response.status(exception.getStatus()).json(errorResponse);
    }
};
exports.CustomExceptionFilter = CustomExceptionFilter;
exports.CustomExceptionFilter = CustomExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], CustomExceptionFilter);
//# sourceMappingURL=http-exceptions.js.map