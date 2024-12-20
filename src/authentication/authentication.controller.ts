import { Body, Controller, Post } from '@nestjs/common';
import {
  LoginDto,
  RegisterDto,
  RegisterResponseDto,
  LoginResponseDto,
} from './authentication.dtos';
import { AuthenticationService } from './authentication.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: RegisterResponseDto,
  })
  @ApiOperation({ summary: 'Register' })
  async register(@Body() body: RegisterDto) {
    return await this.authenticationService.register(body);
  }
  @Post('login')
  @ApiCreatedResponse({
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiOperation({ summary: 'Login' })
  async login(@Body() body: LoginDto) {
    return await this.authenticationService.login(body);
  }
}
