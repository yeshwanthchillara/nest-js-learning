import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, LoginUserDto } from '../dto/users.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.signup(body);
    return {
      success: true,
      message: 'User signed up successfully',
      user,
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.userService.login(loginDto);
    return {
      success: true,
      message: 'User logged in successfully',
      user,
    };
  }
}
