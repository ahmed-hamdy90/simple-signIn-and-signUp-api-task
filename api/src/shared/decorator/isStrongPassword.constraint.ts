import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

/**
 * Custom Constraint for IsStrongPassword Decorator
 */
@ValidatorConstraint({async: false})
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {

    /**
     * @inheritdoc
     */
    validate(password: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        console.log(password);
        /**
         * based on Requirements needs, we need The regular expression checks for:
         * 1. (?=.*[a-zA-Z]) -> At least one letter (a-z, A-Z)
         * 2. (?=.*[0-9]) -> At least one number (0-9)
         * 3. (?=.*[^a-zA-Z0-9]) -> At least one special character (anything not a letter or number)
         * 4. .{8,} -> A minimum length of 8 characters
         */
        const strongRegex = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}');
        return typeof password === 'string' && strongRegex.test(password);
    }

    /**
     * @inheritdoc
     */
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return 'Password must contain at least one letter, one number, and one special character Plus Must at least 8 characters.';
    }
}
