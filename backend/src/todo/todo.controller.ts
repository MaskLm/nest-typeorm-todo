import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResourceOwnershipGuard } from '../auth/guards/resource-ownership.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.interface';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserOwnershipGuard } from '../auth/guards/user-ownership.guard';
import { TodoOwnershipGuard } from '../auth/guards/todo-ownership.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TodoOwnershipGuard)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, ResourceOwnershipGuard)
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TodoOwnershipGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ResourceOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }

  //TODO 修复ResouceOwnershipGuard在这个路由不工作的错误
  @Get('user/:id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  findAllByUserId(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('itemsPerPage') itemsPerPage: number,
  ) {
    return this.todoService.findAllByUserId(+id, +page, +itemsPerPage);
  }
}
