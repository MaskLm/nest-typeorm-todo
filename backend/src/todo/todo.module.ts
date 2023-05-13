import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { AccountService } from '../account/account.service';
import { User } from '../user/entities/user.entity';
import { UserOwnershipGuard } from '../auth/guards/user-ownership.guard';
import { TodoOwnershipGuard } from '../auth/guards/todo-ownership.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    TypeOrmModule.forFeature([User]),
    ResourceModule,
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    AccountService,
    UserOwnershipGuard,
    TodoOwnershipGuard,
  ],
})
export class TodoModule {}
