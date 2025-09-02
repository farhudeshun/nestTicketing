import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class JsonResponse {
    hasError: boolean;
    message: string;
    data?: any | undefined;
    constructor(hasError: boolean, message: string, data?: any | undefined);
}
export declare class ErrorResponse extends JsonResponse {
    constructor(message: string, data?: any);
}
export declare class SuccessResponse extends JsonResponse {
    constructor(data?: any, message?: string);
}
export declare class CustomExceptionFilter<T extends HttpException> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): void;
}
