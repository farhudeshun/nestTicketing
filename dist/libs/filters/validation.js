"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = exports.ValidationExceptionFactory = exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
const http_exceptions_1 = require("./http-exceptions");
const validatoionErrorToObjectError = (validationError) => {
    const recFunc = (verr, obj) => {
        if (!verr.children?.length)
            obj[verr.property] = Object.values(verr.constraints ?? {}).toString();
        else {
            for (let i = 0; i < verr.children.length; i++) {
                const result = recFunc(verr.children[i], {});
                obj[verr.property] = { ...obj[verr.property], ...result };
            }
        }
        return obj;
    };
    return recFunc(validationError, {});
};
class ValidationException {
    errors;
    constructor(errors) {
        this.errors = errors;
    }
}
exports.ValidationException = ValidationException;
const ValidationExceptionFactory = (validationErrors) => {
    const errorsObj = {};
    for (const validationError of validationErrors) {
        Object.assign(errorsObj, validatoionErrorToObjectError(validationError));
    }
    return new ValidationException(errorsObj);
};
exports.ValidationExceptionFactory = ValidationExceptionFactory;
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(common_1.HttpStatus.BAD_REQUEST)
            .json(new http_exceptions_1.JsonResponse(true, 'Validation failed. Check your inputs.', exception.errors));
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(ValidationException)
], ValidationExceptionFilter);
//# sourceMappingURL=validation.js.map