import {
  Body,
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('')
  @UseGuards(AuthenticationGuard)
  async createProduct(@Body() body: any) {
    return await this.productService.createProduct(body);
  }
  @Get('')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }
  @Put(':id')
  @UseGuards(AuthenticationGuard)
  async updateProduct(@Param('id') id: string, @Body() body: any) {
    return await this.productService.updateProduct(id, body);
  }
  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
