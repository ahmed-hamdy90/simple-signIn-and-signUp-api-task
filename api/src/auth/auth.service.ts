import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InvalidAuthenticationTokenError } from 'src/shared/Error/invalidAuthenticationTokenError';
import { NotFoundUserError } from 'src/shared/Error/notFoundUserError';
import { CreationUserDto } from 'src/user/dto/creationUserDto';
import { UserDto } from 'src/user/dto/userDto';
import { UserService } from 'src/user/user.service';
import { LoginResultDto } from './dto/loginResultDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { SignInUserDto } from './dto/signInUserDto';

/**
 * Authentication Service class implementation
 * which responsible for any authenticate process
 */
@Injectable()
export class AuthService {

    /**
     * AuthService Constructor
     * @param {UserService} userService 
     * @param {JwtService} jwtService 
     * @param {ConfigService} configService 
     */
   constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    /**
     * 
     * @param loginData 
     */
    public async login(loginData: SignInUserDto): Promise<LoginResultDto> {
        // Search for User using unique email and validate
        let authorizedUser: UserDto =
            await this.userService.findByEmailAndValidteUserPassword(loginData.email, loginData.password);

        // TODO: Create Anemic Entity for Token Payload for Strict Type
        let tokenPayload: {id: number, email: string};
        tokenPayload = {
            id: authorizedUser.id ?? 0,
            email: authorizedUser.email
        };

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        
        const loginResultDto = new LoginResultDto();
        loginResultDto.authToken = accessToken;
        loginResultDto.user = authorizedUser;

        return loginResultDto;
    }

    /**
     * 
     * @param registerData 
     */
    public async register(registerData: RegisterUserDto): Promise<boolean> {
        // TODO: Check about Missing Restrict for Password - Is can Apply by Class-validator library or not
        const newUser = new CreationUserDto();
        newUser.name = registerData.name;
        newUser.email = registerData.email;
        newUser.password = registerData.password;

        let creationResult: boolean;

        try {
            creationResult = await this.userService.create(newUser);
        } catch (error) {
            console.log(error);
            creationResult = false;
        }

        return creationResult;
    }

    /**
     * 
     * @param token 
     */
    public async validateAuthTokenAndGetAuthorizedUser(token: string): Promise<UserDto> {
        // TODO: Create Anemic Entity for Token Payload for Strict Type
        let tokenPayload: {id: number, email: string};

        try {
            tokenPayload =
                await this.jwtService.verifyAsync(
                    token, 
                    {secret: this.configService.get<string>('Auth_Secert')}
                );
        } catch (error) {
            console.error(error);
            throw new InvalidAuthenticationTokenError(
                'Authentication Token invalid and not able to verify it');
        }

        // 
        let authorizedUser: UserDto;

        try {
            authorizedUser = await this.userService.find(tokenPayload.id);
        } catch (error) {
            console.error(error);
            throw new NotFoundUserError('Given User Not Exists');
        }

        return authorizedUser;
    }
}
