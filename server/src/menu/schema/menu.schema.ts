import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
  @Prop()
  tipo: string;
  @Prop()
  nombre: string;

  @Prop()
  precio: number;

  @Prop()
  imagen: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
