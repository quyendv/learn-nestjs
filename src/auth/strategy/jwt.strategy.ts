import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // name 'jwt' is optinal, but use consistent vs @AuthGuard()
  constructor(
    // configService: ConfigService
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // configService.get('JWT_SECRET'),
    });
  }

  // require this fn for validate in @AuthGuard -> verifyToken
  async validate(payload: { sub: number; email: string }) {
    const user = await this.userModel.findById(payload.sub).select('-password');
    // delete user.password; // use select instead
    return user; // req.user = here -> only return sub, handle getInfo in UserService
  }
}
