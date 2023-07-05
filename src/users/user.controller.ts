import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtGuard) // otherwise, can use custom 'decorator' follow by: https://docs.nestjs.com/custom-decorators
  @Get('me')
  getInfo(@Req() request: Request) {
    console.log(Object.keys(request), request.user);
    return this.userService.getInfo();
  }
}
