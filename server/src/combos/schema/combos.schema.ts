import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ComboDocument = Combo & Document;

@Schema()
export class Combo {
  @Prop()
  nombre: string;

  @Prop()
  precio: number;

  @Prop()
  imagen: string;
}

export const ComboSchema = SchemaFactory.createForClass(Combo);
