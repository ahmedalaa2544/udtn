import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDbService } from '../../DB/user-db/user-db.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly userDbService: UserDbService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer'))
      throw new UnauthorizedException();

    const access_token = authHeader.split(' ')[1];
    console.log(access_token);
    try {
      const payload = this._jwtService.verify(access_token, {
        secret: 'mysecretmysecret',
      });

      request.id = payload.id;
      const user = await this.userDbService.findById(payload.id);
      request.user = user;
      if (!user) throw new NotFoundException('User not found!');
      // pass user in the request
      request.user = user;
      console.log('reach');
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }
}
