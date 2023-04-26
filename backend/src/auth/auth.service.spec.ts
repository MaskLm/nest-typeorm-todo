import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { jwtAccessConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtAccessConstants.secret,
          signOptions: { expiresIn: jwtAccessConstants.expiresIn },
        }),
      ],
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user object without password when validating a valid user', async () => {
      // 模拟 UserService 的 findByUsername 方法
      const userService = moduleRef.get<UserService>(UserService);
      const mockUser: Partial<User> = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
        email: 'test@example.com',
        admin: false,
        todos: [],
      };
      jest
        .spyOn(userService, 'findByUsername')
        .mockImplementation(() => Promise.resolve(mockUser as User));

      // 模拟 bcrypt.compare 方法
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // 调用 AuthService 的 validateUser 方法
      const validatedUser = await service.validateUser(
        'testuser',
        'plaintextpassword',
      );

      // 检查返回的用户对象是否正确，且不包含密码字段
      expect(validatedUser).toBeDefined();
      expect(validatedUser.id).toEqual(mockUser.id);
      expect(validatedUser.username).toEqual(mockUser.username);
      expect(validatedUser.email).toEqual(mockUser.email);
      expect('password' in validatedUser).toBe(false);
    });
  });
});
