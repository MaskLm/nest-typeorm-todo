import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { username, password, email } = createAccountDto;

    const account = new Account();
    account.username = username;
    account.password = password;
    account.email = email;
    account.admin = false;
    return await this.accountRepository.save(account);
  }

  async findAll() {
    return await this.accountRepository.find();
  }

  async findOne(id: number) {
    return await this.accountRepository.findOne({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return await this.accountRepository.findOne({
      where: { username },
    });
  }

  async checkAdmin(id: number) {
    return await this.accountRepository.findOne({
      where: { id, admin: true },
    });
  }

  async update(id: number, updateUserDto: UpdateAccountDto) {
    const { username, password, email, admin } = updateUserDto;
    const backUser = await this.accountRepository.findOne({
      where: { id },
    });
    if (password === backUser.password) {
      return await this.accountRepository.update(
        { id },
        { username, email, admin },
      );
    } else {
      if (backUser) {
        backUser.username = username;
        backUser.email = email;
        backUser.admin = admin;
        backUser.password = password;
        return await this.accountRepository.save(backUser);
      }
    }
  }

  async remove(id: number) {
    return await this.accountRepository.delete({
      id,
    });
  }

  async findAllPagination(page: number, itemsPerPage: number) {
    const skip = (page - 1) * itemsPerPage;
    // Find todos with pagination
    const accounts = await this.accountRepository.find({
      skip,
      take: itemsPerPage,
      select: ['username', 'email', 'admin', 'id'],
    });

    // Get the total count of todos for the account
    const totalCount = await this.accountRepository.count({});

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      accounts: accounts,
      totalPages: totalPages,
    };
  }
}
