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
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.interface';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserOwnershipGuard } from '../auth/guards/user-ownership.guard';
import { TodoOwnershipGuard } from '../auth/guards/todo-ownership.guard';
import { TodoParamsOwnershipGuard } from '../auth/guards/todo-params-ownership.guard';
import { SearchTodoDto } from './dto/search-todo.dto';

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
  @UseGuards(JwtAuthGuard, TodoParamsOwnershipGuard)
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TodoParamsOwnershipGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TodoParamsOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }

  @Get('account/:id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  findAllByUserId(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('itemsPerPage') itemsPerPage: number,
  ) {
    return this.todoService.findAllByUserId(+id, +page, +itemsPerPage);
  }

  @Get('account/:id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  searchTodo(
    @Param('id') userId: string,
    @Query('page') page: number,
    @Query('itemsPerPage') itemsPerPage: number,
    @Query() searchTodoDto: SearchTodoDto,
  ) {
    return this.todoService.searchTodo(
      +userId,
      +page,
      +itemsPerPage,
      searchTodoDto,
    );
  }
}
