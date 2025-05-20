import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LanguageModel } from './modules/language';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule, TranslateModule } from './modules';
import { ProductModule } from './modules/product';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL as string),
    LanguageModel,
    TranslateModule,
    CategoryModule,
    ProductModule
  ],
})
export class AppModule {}
