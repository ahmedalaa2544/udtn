import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserDbModule } from './DB/user-db/user-db.module';
import { ProductDbModule } from './db/product-db/product-db.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: 'mongodb+srv://elearninggradproject:8EdoYEX5LU05hE6U@cluster0.w2w9ary.mongodb.net/udtn',
      }),
      inject: [ConfigService],
    }),
    AuthenticationModule,
    UserDbModule,
    ProductDbModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
