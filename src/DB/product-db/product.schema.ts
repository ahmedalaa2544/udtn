import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, lowercase: true })
  name: string;
  @Prop({ required: true, lowercase: true })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  stock: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
