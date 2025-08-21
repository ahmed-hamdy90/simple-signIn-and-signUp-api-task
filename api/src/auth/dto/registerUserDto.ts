import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { BasicDto } from "src/shared/dto/base.dto";

/**
 * Represent Register User DTO class
 */
export class RegisterUserDto implements BasicDto {

    /**
     * Username value
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    /**
     * User's email
     */
    @IsEmail()
    @IsNotEmpty()
    email: string;

    /**
     * User's password
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}