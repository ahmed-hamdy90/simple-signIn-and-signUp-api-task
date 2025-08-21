import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserDto } from "./userDto";

/**
 * User Dto Class for Creation
 */
export class CreationUserDto extends UserDto {

    /**
     * User's password
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}