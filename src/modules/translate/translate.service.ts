import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Definition, Translate } from './models';
import { CreateTranslateDto } from './dtos/create-translate.dto';
import { Language } from '../language';

@Injectable()
export class TranslateService {
  constructor(
    @InjectModel(Translate.name) private translateModel: Model<Translate>,
    @InjectModel(Definition.name) private definitionModel: Model<Definition>,
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {}

  async getAll() {
    const translates = await this.translateModel.find().populate('definitions');
    return {
      count: translates.length,
      data: translates,
    };
  }

  async getTranslate(lang: string, translateId: string) {
  const language = await this.languageModel.findOne({ code: lang });
  if (!language) return '';

  const definition = await this.definitionModel.findOne({
    translateId,
    languageId: language._id,
  });

  return definition?.value || '';
}


  async create(payload: CreateTranslateDto) {
  const translate = await this.translateModel.create({ code: payload.code });
  for (let key of Object.keys(payload.definitions)) {
    const lang = await this.languageModel.findOne({ code: key });

    if (!lang) {
      console.warn(`Language not found: ${key}`);
      continue;
    }

    const def = await this.definitionModel.create({
      value: payload.definitions[key],
      translateId: translate._id,
      languageId: lang._id,
    });

    await this.translateModel.updateOne(
      { _id: translate._id },
      { $push: { definitions: def._id } },
    );
  }

  return {
    message: 'Yaratildi'
  };
}

}
