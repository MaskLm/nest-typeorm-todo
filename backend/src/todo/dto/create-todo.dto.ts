import { User } from '../../account/entities/account.entity';

export class CreateTodoDto {
  title: string;
  description: string;
  done: boolean;
  deadline: Date;
  user: User;
}
