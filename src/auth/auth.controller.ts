import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('register')
  register(@Body() userDto: UserDto) {
    // console.log(userDto);
    return this.authService.register(userDto);
  }
}
