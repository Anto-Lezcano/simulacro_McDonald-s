import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PromoDocument = Promo & Document;
@Schema()
export class Promo {
  @Prop()
  tipo: string;
  @Prop()
  nombre: string;
  @Prop()
  detalle: string;
  @Prop()
  precio: number;
  @Prop()
  imagen: string;
}

export const PromoSchema = SchemaFactory.createForClass(Promo);
