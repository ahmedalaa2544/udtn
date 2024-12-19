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
import {
  Roles,
  AuthorizationGuard,
  Role,
} from 'src/guards/authorization/authorization.guard';
import { ProductDto } from './product.dto';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('')
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async createProduct(@Body() body: ProductDto) {
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
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async updateProduct(@Param('id') id: string, @Body() body: ProductDto) {
    return await this.productService.updateProduct(id, body);
  }
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
