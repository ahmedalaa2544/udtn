import { Injectable } from '@nestjs/common';
import { ProductDbService } from '../db/product-db/product-db.service';

@Injectable()
export class ProductService {
  constructor(private readonly productDbService: ProductDbService) {}
  async createProduct(body: any) {
    console.log('Creating product', body);
    return await this.productDbService.create(body);
  }
  async getAllProducts() {
    return await this.productDbService.findAll();
  }
  async getProductById(id: any) {
    return await this.productDbService.findById(id);
  }
  async updateProduct(id: any, body: any) {
    return await this.productDbService.update(id, body);
  }

  async deleteProduct(id: any) {
    return (await this.productDbService.delete(id))
      ? { message: 'Product deleted successfully' }
      : { message: 'Product not found' };
  }
}
