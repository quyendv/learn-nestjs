import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async login(userDto: UserDto) {
    try {
      const checkExisted = await this.userModel.findOne({ email: userDto.email });
      if (!checkExisted) return new BadRequestException("User doesn't exist");

      const validPasswd = await argon.verify(checkExisted.password, userDto.password);
      if (!validPasswd) return new BadRequestException('Password is incorrect');

      console.log(checkExisted);
      // jwt

      return 'The login has been success';
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async register(userDto: UserDto) {
    try {
      // console.log(userDto);
      const checkExisted = await this.userModel.findOne({ email: userDto.email });
      if (checkExisted) return new BadRequestException('Email already used');

      const newUser = new this.userModel({
        ...userDto,
        password: await argon.hash(userDto.password),
      });
      await newUser.save();
      console.log(newUser);

      // jwt

      return 'The registration has been successful';
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
