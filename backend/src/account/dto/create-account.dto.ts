import { IsAlphanumeric, IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsAlphanumeric()
  @MaxLength(10)
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
