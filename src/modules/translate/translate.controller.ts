import { Body, Controller, Get, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { CreateTranslateDto } from './dtos/create-translate.dto';

@Controller('translates')
export class TranslateController {
  constructor(private service: TranslateService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Post()
  async create(@Body() payload: CreateTranslateDto) {
    return await this.service.create(payload);
  }
}
