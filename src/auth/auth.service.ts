import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const checkExisted = await this.userModel.findOne({ email: userDto.email });
    if (!checkExisted) throw new BadRequestException("User doesn't exist");

    const validPasswd = await argon.verify(checkExisted.password, userDto.password);
    if (!validPasswd) throw new BadRequestException('Password is incorrect');

    console.log(checkExisted);

    return {
      message: 'The login has been success',
      accessToken: await this.convertToJwtString(checkExisted.id, checkExisted.email),
    };
  }

  async register(userDto: UserDto) {
    // console.log(userDto);
    const checkExisted = await this.userModel.findOne({ email: userDto.email });
    if (checkExisted) throw new BadRequestException('Email already used');

    const newUser = new this.userModel({
      ...userDto,
      password: await argon.hash(userDto.password),
    });
    await newUser.save();
    console.log(newUser);

    return {
      message: 'The registration has been success',
      accessToken: await this.convertToJwtString(newUser.id, newUser.email),
    };
  }

  async convertToJwtString(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId, // Subject: whom the token refers to
      email,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: process.env.JWT_SECRET,
    });
  }
}
