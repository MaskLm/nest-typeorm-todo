import { IsString } from 'class-validator';

export class LoginAccountDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
