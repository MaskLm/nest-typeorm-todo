import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TodoService } from '../../todo/todo.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class TodoParamsOwnershipGuard implements CanActivate {
  constructor(private readonly todoService: TodoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('TodoParamsOwnershipGuard');
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user', user);
    const todoId = Number(request.params.id);
    if (!user || !todoId) {
      return false;
    }

    const todo = await this.todoService.findOne(todoId);
    console.log('todo', todo);
    if (!todo) {
      return false;
    }
    return todo.user.id === user.id || user.admin === true;
  }
}
