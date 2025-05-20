import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './models';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { TranslateService } from '../translate';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private translateService: TranslateService,
  ) {}

  async getAll(language: string) {
    const res: any[] = [];
    const categories = await this.categoryModel.find();

    for (let c of categories) {
      const name = await this.translateService.getTranslate(language, c.name);

      res.push({ ...c.toObject(), name });
    }

    return {
      count: res.length,
      data: res,
    };
  }

  async createCategory(payload: CreateCategoryDto) {
    const existing = await this.categoryModel.findOne({ name: payload.name });
    if (existing) {
      throw new BadRequestException('Bunday category allaqachon mavjud');
    }

    const category = await this.categoryModel.create({ name: payload.name });
    return { message: 'yaratildi', category };
  }

  async deleteCategory(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Kategoriya topilmadi');
    }
    const deleted = await this.categoryModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Kategoriya topilmadi');
    }
    return { message: "O'chirildi" };
  }
}
