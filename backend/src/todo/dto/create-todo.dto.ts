import { User } from "../../user/entities/user.entity";

export class CreateTodoDto {
  title: string;
  description: string;
  done: boolean;
  deadline: Date;
  user: User;
}
