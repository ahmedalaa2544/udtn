import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'The name of the product.',
    example: 'Wireless Headphones',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The price of the product in USD.',
    example: 199,
  })
  @IsInt()
  price: number;

  @ApiProperty({
    description: 'A brief description of the product.',
    example: 'High-quality wireless headphones with noise cancellation.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The available stock quantity for the product.',
    example: 50,
  })
  @IsInt()
  stock: number;
}

export class ProductResponseDto {
  @ApiProperty({ example: '6765a710a22b86f5211ef920' })
  _id: string;

  @ApiProperty({ example: 'abxxx' })
  name: string;

  @ApiProperty({ example: "that's very good producta" })
  description: string;

  @ApiProperty({ example: 1001 })
  price: number;

  @ApiProperty({ example: 2001 })
  stock: number;

  @ApiProperty({ example: '2024-12-20T17:19:12.219Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-12-20T17:19:12.219Z' })
  updatedAt: string;

  @ApiProperty({ example: 0 })
  __v: number;
}

export class DeleteResponseDto {
  @ApiProperty({ example: 'Product deleted successfully' })
  message: string;
}
