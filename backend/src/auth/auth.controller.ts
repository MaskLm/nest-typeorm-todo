import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipJwtAuth } from './constants';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body.user);
  }
}
