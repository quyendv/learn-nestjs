import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getInfo() {
    // FIXME: handle getInfo here instead of validate (verifyToken) in JwtStrategy
    return 'My detail information';
  }
}
