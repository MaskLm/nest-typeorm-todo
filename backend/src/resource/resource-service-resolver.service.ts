// resource-service-resolver.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { TodoService } from '../todo/todo.service';

@Injectable()
export class ResourceServiceResolver {
  constructor(
    private userService: AccountService,
    private todoService: TodoService,
  ) {}

  resolve(resourceName: string): AccountService | TodoService {
    switch (resourceName) {
      case 'user':
        return this.userService;
      case 'todo':
        return this.todoService;
      default:
        throw new NotFoundException(
          `ResourceService for '${resourceName}' not found.`,
        );
    }
  }
}
