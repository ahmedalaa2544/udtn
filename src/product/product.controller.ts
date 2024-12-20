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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  ProductDto,
  ProductResponseDto,
  DeleteResponseDto,
} from './product.dto';
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('')
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @ApiOperation({ summary: 'Create Product' })
  @ApiCreatedResponse({
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  async createProduct(@Body() body: ProductDto) {
    return await this.productService.createProduct(body);
  }
  @Get('')
  @ApiOperation({ summary: 'Get All Products' })
  @ApiResponse({
    description: 'List of all products',
    type: [ProductResponseDto],
  })
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get Product by Id' })
  @ApiResponse({
    description: 'Details of the product',
    type: ProductResponseDto,
  })
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @ApiOperation({ summary: 'Update Product' })
  @ApiResponse({
    description: 'Updated product details',
    type: ProductResponseDto,
  })
  async updateProduct(@Param('id') id: string, @Body() body: ProductDto) {
    return await this.productService.updateProduct(id, body);
  }
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @ApiResponse({
    description: 'Confirmation message for product deletion',
    type: DeleteResponseDto,
  })
  @ApiOperation({ summary: 'Delete Product' })
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
