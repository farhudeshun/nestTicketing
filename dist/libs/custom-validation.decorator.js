"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidation = CustomValidation;
const class_validator_1 = require("class-validator");
function CustomValidation(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'CustomValidation',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const cb = args.constraints[0];
                    return cb(args.object);
                },
            },
        });
    };
}
//# sourceMappingURL=custom-validation.decorator.js.map