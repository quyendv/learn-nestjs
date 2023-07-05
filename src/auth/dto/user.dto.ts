import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  displayName?: string;

  // @Expose() // use plainToClass(User, fromPlainUser, { excludeExtraneousValues: true }) to remove all not expose
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
