import { Body, Controller, Get, HttpCode, Param, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/userDto';
import { CreationUserDto } from './dto/creationUserDto';

/**
 * User Controller class
 */
@Controller('users')
export class UserController {

  /**
   * UserController constructor
   * @param {UserService} userService user service instance
   */
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findBy({});
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<UserDto|null> {
    // TODO: make try-catch and return 400 Status code
    return this.userService.find(Number(id));
  }

  @HttpCode(201)
  @Post()
  async create(
    @Body(new ValidationPipe()) newUser: CreationUserDto): Promise<boolean> {
    // TODO: make result value if false Plus return 400 Status code
    return this.userService.create(newUser);
  }
}