import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'class-validator';
export declare class ValidationException {
    errors: {
        [key: string]: string[];
    };
    constructor(errors: {
        [key: string]: string[];
    });
}
export declare const ValidationExceptionFactory: (validationErrors: ValidationError[]) => ValidationException;
export declare class ValidationExceptionFilter implements ExceptionFilter<ValidationException> {
    catch(exception: ValidationException, host: ArgumentsHost): void;
}
