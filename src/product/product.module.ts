import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDbModule } from 'src/db/product-db/product-db.module';
import { UserDbModule } from 'src/DB/user-db/user-db.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductController],
  providers: [ProductService, JwtService],
  imports: [ProductDbModule, UserDbModule],
})
export class ProductModule {}
