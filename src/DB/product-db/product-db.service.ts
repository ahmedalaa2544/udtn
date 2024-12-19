import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
@Injectable()
export class ProductDbService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async findById(id: any): Promise<Product> {
    return this.productModel.findById(id);
  }
  async findOne(parameters: any): Promise<Product> {
    return this.productModel.findOne(parameters);
  }
  async create(object: any): Promise<Product> {
    return this.productModel.create(object);
  }
  async update(id: any, object: any): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, object, { new: true });
  }
  async delete(id: any): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }
  async find(parameters: any): Promise<Product[]> {
    return this.productModel.find(parameters);
  }
}
