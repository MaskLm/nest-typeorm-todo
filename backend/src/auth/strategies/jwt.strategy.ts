import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountService } from '../../account/account.service';
import { jwtAccessConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: AccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAccessConstants.secret,
    });
  }

  async validate(payload: any) {
    const existUser = await this.userService.findOne(payload.sub);
    if (!existUser) {
      throw new UnauthorizedException('Invalid token');
    }
    return { ...payload, id: payload.sub };
  }
}
