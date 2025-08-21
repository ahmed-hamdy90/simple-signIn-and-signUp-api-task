import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { InvalidAuthenticationTokenError } from "src/shared/Error/invalidAuthenticationTokenError";
import { UserDto } from "src/user/dto/userDto";
import { AuthService } from "../auth.service";

/**
 * Custom Authentication Gurad to Validate Given Authentication token
 */
@Injectable()
export class AuthGurad implements CanActivate {

    /**
     * AuthGurad constructor
     * @param {AuthService} authService authentication service instance 
     */
    constructor(private readonly authService: AuthService) {}

    /**
     * @inheritdoc
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        let token: string;

        try {
            token = this.extractTokenFromHeader(request);
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException();
        }

        let authorizedUser: UserDto;

        try {
            authorizedUser =
                await this.authService.validateAuthTokenAndGetAuthorizedUser(token);
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException();
        }
        
        // TODO: Create Anemic Entity for Token Payload for Strict Type
        request['user'] = {
            id: authorizedUser.id,
            email: authorizedUser.email
        };

        return true;
    }

    /**
     * Extract Authentication token from In-progress Request's Header
     * @param {Request} request in-progress Request instance
     * @returns {string} authentication token
     */
    private extractTokenFromHeader(request: Request): string {
        const authenticateHeaderValue = request.headers.authorization;
        if (!authenticateHeaderValue || !authenticateHeaderValue.startsWith('Bearer')) {
            throw new InvalidAuthenticationTokenError(
                'Missing or Invalid Passing Authentication token');
        }

        const [type, token] = authenticateHeaderValue?.split(' ') ?? [];

        return token;
    }

}
