import { IsInt, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;
  @IsInt()
  price: number;
  @IsString()
  description: string;
  @IsInt()
  stock: number;
}
