import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Definition } from './definition.model';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'translates', timestamps: true, versionKey: false })
export class Translate {
  @Prop({})
  code: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Definition' }] })
  definitions: Definition[];
}

export const TranslateSchema = SchemaFactory.createForClass(Translate);
