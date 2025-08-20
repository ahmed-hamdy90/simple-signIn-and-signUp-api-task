import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { BasicDto } from "src/shared/dto/base.dto";

/**
 * Main User Dto Class 
 */
export class UserDto implements BasicDto {

    /**
     * Unique User identifier
     */
    @IsOptional()
    id?: number;

    /**
     * User's name
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
}