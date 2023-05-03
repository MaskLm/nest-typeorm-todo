import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;

    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.admin = false;

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async checkAdmin(id: number) {
    return await this.userRepository.findOne({
      where: { id, admin: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, email, refreshToken, admin } = updateUserDto;
    if (password === '') {
      return await this.userRepository.update(
        { id },
        { username, email, refreshToken, admin },
      );
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return await this.userRepository.update(
      { id },
      { username, password: hashPassword, email, refreshToken, admin },
    );
  }

  async remove(id: number) {
    return await this.userRepository.delete({
      id,
    });
  }

  async findAllPagination(page: number, itemsPerPage: number) {
    const skip = (page - 1) * itemsPerPage;
    // Find todos with pagination
    const users = await this.userRepository.find({
      skip,
      take: itemsPerPage,
      select: ['username', 'email', 'admin', 'id'],
    });

    // Get the total count of todos for the user
    const totalCount = await this.userRepository.count({});

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      users: users,
      totalPages: totalPages,
    };
  }
}
