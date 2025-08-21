import { registerDecorator, ValidationOptions } from "class-validator";
import { IsStrongPasswordConstraint } from "./isStrongPassword.constraint";

/**
 * Custom IsStrongPassword Decorator using {@see IsStrongPasswordConstraint} To be applying on Custom DTO file.
 * @inheritdoc
 */
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}