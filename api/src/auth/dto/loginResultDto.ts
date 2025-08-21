import { BasicDto } from "src/shared/dto/base.dto";
import { UserDto } from "src/user/dto/userDto";

/**
 * Represent Login Result Dto class
 */
export class LoginResultDto implements BasicDto {

    /**
     * authentication token
     */
    authToken: string;

    /**
     * authorized User details
     */
    user: UserDto;
}