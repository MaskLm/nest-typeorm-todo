import { Account } from '../../account/entities/account.entity';

export class CreateUserDto {
  displayName: string;
  public_emails?: string[];
  avatarUrl?: string;
  account: Account;
}
