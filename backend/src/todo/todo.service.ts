import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const { title, description, done, deadline, user } = createTodoDto;
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.done = done;
    todo.deadline = deadline;
    todo.user = user;
    return await this.todoRepository.save(todo);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findAllByUserId(userId: number, page: number, itemsPerPage: number) {
    const skip = (page - 1) * itemsPerPage;
    // Find todos with pagination
    const todos = await this.todoRepository.find({
      skip,
      take: itemsPerPage,
      where: { user: { id: userId } },
    });

    // Get the total count of todos for the user
    const totalCount = await this.todoRepository.count({
      where: { user: { id: userId } },
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      todos: todos,
      totalPages: totalPages,
    };
  }

  async findOne(id: number) {
    return await this.todoRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const { title, description, done, deadline, user } = updateTodoDto;
    return await this.todoRepository.update(
      { id },
      { title, description, done, deadline, user },
    );
  }

  async remove(id: number) {
    return await this.todoRepository.delete({
      id,
    });
  }
}
