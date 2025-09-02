import { ValidationOptions } from 'class-validator';
export declare function CustomValidation(property: (...args: any[]) => Promise<boolean> | boolean, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
