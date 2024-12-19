import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() body: any) {
    return await this.authenticationService.register(body);
  }
  @Post('login')
  async login(@Body() body: any) {
    return await this.authenticationService.login(body);
  }
}
