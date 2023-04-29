import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UniqueConstraintInterceptor } from './interceptors/unique-constraint.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResourceModule } from '../resource/resource.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ResourceModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UniqueConstraintInterceptor,
    },
  ],
})
export class UserModule {}
