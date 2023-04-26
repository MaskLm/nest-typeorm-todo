import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../user/dto/login-user.dto';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<null | Omit<User, 'password'>> {
    const existUser = await this.userService.findByUsername(username);

    if (!existUser) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: ignorePass, ...restUser } = existUser;

    return restUser;
  }

  async generateAccessToken(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
    });
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
    return refreshToken;
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      // Verify and decode the Refresh Token
      const decodedPayload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Find the user by ID
      const user = await this.userRepository.findOne(decodedPayload.sub);

      // Check if the user exists and the Refresh Token matches
      if (user && user.refreshToken === refreshToken) {
        // Generate a new Access Token
        return this.generateAccessToken(user);
      } else {
        throw new Error('Invalid Refresh Token');
      }
    } catch (error) {
      throw new Error('Invalid Refresh Token');
    }
  }

  async login(loginUser: LoginUserDto) {
    const restUser = await this.validateUser(
      loginUser.username,
      loginUser.password,
    );
    return {
      accessToken: this.generateAccessToken(restUser),
      refreshToken: this.generateRefreshToken(restUser),
      user: restUser,
    };
  }
}
