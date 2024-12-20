import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user for login.',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user for login.',
    example: 'securePassword123',
  })
  @IsString()
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: 'The email of the user for registration.',
    example: 'newuser@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user for registration.',
    example: 'strongPassword123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The role of the user in the system.',
    example: 'admin',
  })
  @IsString()
  role: string;
}

export class RegisterResponseDto {
  @ApiProperty({
    description: 'The email of the registered user.',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The role assigned to the user.',
    example: 'admin',
  })
  role: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'The access token for the logged-in user.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  access_token: string;
}
