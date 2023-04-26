import { SetMetadata } from '@nestjs/common';
import * as process from 'process';

export const jwtAccessConstants = {
  secret: process.env.JWT_SECRETKEY,
  expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
};

export const jwtRefreshConstants = {
  secret: process.env.JWT_SECRETKEY,
  expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
