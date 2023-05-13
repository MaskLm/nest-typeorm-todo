import { Module, Scope } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/account.entity';
import { UniqueConstraintInterceptor } from './interceptors/unique-constraint.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResourceModule } from '../resource/resource.module';
import { UserOwnershipGuard } from '../auth/guards/user-ownership.guard';
import { ForeignKeyConstraintInterceptor } from './interceptors/foreign-key-constraint-interceptor.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ResourceModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UniqueConstraintInterceptor,
      scope: Scope.REQUEST,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ForeignKeyConstraintInterceptor,
      scope: Scope.REQUEST,
    },
    UserOwnershipGuard,
  ],
})
export class AccountModule {}
