import { Module } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UserDbService],
  exports: [UserDbService],
})
export class UserDbModule {}
