import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { TranslateService } from '../translate';
import { Product } from './models';
import { CreateProductDto, UpdateProductDto } from './dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private translateService: TranslateService,
  ) {}

  async getAll(language: string) {
    const res: any[] = [];
    const products = await this.productModel.find();

    for (let p of products) {
      const name = await this.translateService.getTranslate(language, p.name);
      const description = await this.translateService.getTranslate(
        language,
        p.description,
      );

      res.push({ ...p.toObject(), name, description });
    }

    return {
      count: res.length,
      data: res,
    };
  }

  async getById(id: string, language: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Product topilmadi');
    }

    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product topilmadi');

    const name = await this.translateService.getTranslate(
      language,
      product.name,
    );
    const description = await this.translateService.getTranslate(
      language,
      product.description,
    );

    return { ...product.toObject(), name, description };
  }

  async createProduct(payload: CreateProductDto) {
    const existing = await this.productModel.findOne({ name: payload.name });
    if (existing) {
      throw new BadRequestException('Bunday product allaqachon mavjud');
    }

    const created = await this.productModel.create(payload);
    return { message: 'Product yaratildi', product: created };
  }

  async updateProduct(id: string, payload: UpdateProductDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Product topilmadi');
    }

    const updated = await this.productModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Product topilmadi');

    return { message: 'Yangilandi', product: updated };
  }

  async deleteProduct(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Product topilmadi');
    }

    const deleted = await this.productModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Product topilmadi');

    return { message: "O'chirildi" };
  }
}
