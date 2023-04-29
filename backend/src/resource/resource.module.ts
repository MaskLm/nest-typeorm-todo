import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TodoService } from '../todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Todo } from '../todo/entities/todo.entity';
import { ResourceServiceResolver } from './resource-service-resolver.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  providers: [UserService, TodoService, ResourceServiceResolver],
  exports: [ResourceServiceResolver],
})
export class ResourceModule {}
