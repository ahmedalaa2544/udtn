import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './authentication.dtos';
import { AuthenticationService } from './authentication.service';
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authenticationService.register(body);
  }
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authenticationService.login(body);
  }
}
