import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserDbModule } from 'src/DB/user-db/user-db.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtService],
  imports: [UserDbModule],
})
export class AuthenticationModule {}
