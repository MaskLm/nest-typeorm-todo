import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/roles/roles.interface';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserOwnershipGuard } from '../auth/guards/user-ownership.guard';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private readonly userService: AccountService) {}

  @Post('reg')
  async create(@Body() createUserDto: CreateAccountDto) {
    return this.userService.create(createUserDto);
  }

  /*  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.userService.findAll();
  }*/

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateAccountDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllPagination(
    @Query('page') page: number,
    @Query('itemsPerPage') itemsPerPage: number,
  ) {
    return this.userService.findAllPagination(+page, +itemsPerPage);
  }
}
