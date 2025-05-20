import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {
  Definition,
  DefinitionSchema,
  Translate,
  TranslateModule,
  TranslateSchema,
  TranslateService,
} from '../translate';
import { Product, ProductSchema } from './models';
import { Category, CategorySchema } from '../category';
import { Language, LanguageSchema } from '../language';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Translate.name, schema: TranslateSchema },
      { name: Definition.name, schema: DefinitionSchema },
      { name: Language.name, schema: LanguageSchema },
    ]),

    TranslateModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, TranslateService],
})
export class ProductModule {}
