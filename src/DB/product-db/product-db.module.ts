import { Module } from '@nestjs/common';
import { ProductDbService } from './product-db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './product.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
  ],
  providers: [ProductDbService],
  exports: [ProductDbService],
})
export class ProductDbModule {}
