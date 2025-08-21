import { IsNotEmpty, IsString } from "class-validator";
import { BasicDto } from "src/shared/dto/base.dto";

/**
 * Represent SignIn User DTO class
 */
export class SignInUserDto implements BasicDto {

    /**
     * User's email
     */
    @IsString()
    @IsNotEmpty()
    email: string;

    /**
     * User's password
     */
    @IsNotEmpty()
    @IsString()
    password: string;
}