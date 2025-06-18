import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Combo } from "src/combos/schema/combos.schema";

export type CouponDocument = Coupon & Document;

@Schema()
export class Coupon {
  @Prop({ required: true })
  codigo: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  descuento: number;

  @Prop({ required: true })
  expiracion: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Combos" }], default: [] })
  combos: Types.ObjectId[];
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
