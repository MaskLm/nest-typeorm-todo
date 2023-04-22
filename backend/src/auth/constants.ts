import { SetMetadata } from '@nestjs/common';
import * as process from 'process';

export const jwtConstants = {
  secret: process.env.JWT_SECRETKEY,
  expiresIn: process.env.JWT_EXPIRESIN,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
