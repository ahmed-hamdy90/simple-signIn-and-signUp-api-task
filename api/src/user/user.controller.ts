import { BadRequestException, Controller, Get, NotFoundException, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGurad } from 'src/auth/gurad/auth.gurad';
import { UserDto } from './dto/userDto';
import { UserService } from './user.service';

/**
 * User Controller class For any HTTP Actions for Users
 */
@Controller('users')
export class UserController {

  /**
   * UserController constructor
   * @param {UserService} userService user service instance
   */
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGurad)
  @Get()
  async findAll(): Promise<UserDto[]> {
    // Now It is public for All But Must be apply Restrict on Given Data for Security, Apply User Roles
    return this.userService.findBy({});
  }

  @UseGuards(AuthGurad)
  @Get('/:id')
  async findById(@Param('id') id: string, @Request() request: Request): Promise<UserDto> {
    const requestId: number = Number(id);
    const authorizedUser: {id: number, email: string} | undefined = request['user'];

    // First Make sure given request User's data the same as Authorized User for Security
    if (!authorizedUser || authorizedUser.id !== requestId) {
      throw new BadRequestException();
    }

    let userDataForResponse: UserDto;
    try {
      userDataForResponse = await this.userService.find(requestId);
    } catch (error) {
      console.error(error);
      throw new NotFoundException();
    }

    return userDataForResponse;
  }
}
