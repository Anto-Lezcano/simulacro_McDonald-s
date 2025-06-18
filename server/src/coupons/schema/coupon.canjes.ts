import { Schema, Prop } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { User } from "src/users/schema/user.schema";
import { SchemaFactory } from "@nestjs/mongoose";

export type CouponCanjeadoDocument = CouponCanjeado & Document;
@Schema()
export class CouponCanjeado {
  @Prop({
    type: [{ type: Types.ObjectId, ref: "Users" }],
    required: true,
    default: [],
  })
  user: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: "Cupon" }],
    required: true,
    default: [],
  })
  cupon: Types.ObjectId;

  @Prop({ default: false })
  canjeado: boolean;

  @Prop({ default: Date.now })
  fecha: Date;
}

export const CouponCanjeadoSchema =
  SchemaFactory.createForClass(CouponCanjeado);
