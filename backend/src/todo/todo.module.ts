import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { ResourceModule } from '../resource/resource.module';
import { UserOwnershipGuard } from '../auth/guards/user-ownership.guard';
import { TodoOwnershipGuard } from '../auth/guards/todo-ownership.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    TypeOrmModule.forFeature([User]),
    ResourceModule,
  ],
  controllers: [TodoController],
  providers: [TodoService, UserService, UserOwnershipGuard, TodoOwnershipGuard],
})
export class TodoModule {}
