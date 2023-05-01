import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TodoService } from '../../todo/todo.service';

@Injectable()
export class TodoParamsOwnershipGuard implements CanActivate {
  constructor(private readonly todoService: TodoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const todoId = Number(request.params.id);
    if (!user || !todoId) {
      return false;
    }

    const todo = await this.todoService.findOne(todoId);
    if (!todo) {
      return false;
    }
    return todo.user.id === user.id || user.admin === true;
  }
}
