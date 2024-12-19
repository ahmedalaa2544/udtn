import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDbService } from '../DB/user-db/user-db.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userDbService: UserDbService,
    private jwtService: JwtService,
  ) {}
  async register(body: any): Promise<any> {
    const isExist = await this.userDbService.findOne({ email: body?.email });

    if (isExist) {
      throw new UnprocessableEntityException('User already exists');
    }
    const hashPassword = await bcrypt.hash(body?.password, 10);

    const user = await this.userDbService.create({
      ...body,
      password: hashPassword,
    });

    return { ...body, password: undefined };
  }
  async login(body: any): Promise<{ access_token: string }> {
    const user = await this.userDbService.findOne({ email: body?.email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isMatch = bcrypt.compare(body?.password, user?.password);

    if (!isMatch) throw new BadRequestException('Invalid credentials!');

    const payload = { name: user.email, id: user['_id'] };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: 'mysecretmysecret',
    });

    return { access_token };
  }
}
