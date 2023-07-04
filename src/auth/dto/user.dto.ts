import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  // @IsNotEmpty()
  // displayName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @Expose() // use plainToClass(User, fromPlainUser, { excludeExtraneousValues: true }) to remove all not expose
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
