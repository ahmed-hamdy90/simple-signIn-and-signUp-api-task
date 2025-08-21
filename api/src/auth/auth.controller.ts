import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { NotFoundUserError } from 'src/shared/Error/notFoundUserError';
import { AuthService } from './auth.service';
import { LoginResultDto } from './dto/loginResultDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { SignInUserDto } from './dto/signInUserDto';

/**
 * Auth Controller class For any HTTP Actions for Authentication and Register Process
 */
@Controller('auth')
export class AuthController {

    /**
     * AuthController
     * @param {AuthService} authService authrntication service instance
     */
    constructor(private readonly authService: AuthService) {}


    @Post('/login')
    async signIn(@Body(new ValidationPipe()) signInFormData: SignInUserDto): Promise<LoginResultDto> {
        let signInProcessResult: LoginResultDto;

        try {
            signInProcessResult = await this.authService.login(signInFormData);
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundUserError)
                throw new NotFoundException();
            else
                throw new BadRequestException();
        }

        return signInProcessResult;
    }

    @HttpCode(201)
    @Post('/register')
    async signUp(@Body(new ValidationPipe()) signUpFormData: RegisterUserDto): Promise<boolean> {

        let signUpProcessResult: boolean;

        try {
            signUpProcessResult = await this.authService.register(signUpFormData);
        } catch (error) {
            console.error(error);
            signUpProcessResult = false;
        }

        if (!signUpProcessResult)
            throw new BadRequestException();
        
        return true;
    }
}
