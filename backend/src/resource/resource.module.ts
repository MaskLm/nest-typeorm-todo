/*
import { Module } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { TodoService } from '../todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../account/entities/account.entity';
import { Todo } from '../todo/entities/todo.entity';
import { ResourceServiceResolver } from './resource-service-resolver.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  providers: [AccountService, TodoService, ResourceServiceResolver],
  exports: [ResourceServiceResolver],
})
export class ResourceModule {}
*/
