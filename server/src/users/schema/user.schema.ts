import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Coupon } from "src/coupons/schema/coupon.schema";
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  mail: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  points: number;
  @Prop({ default: "local" })
  provider: "local" | "google";

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: "Coupon",
      },
    ],
    default: [],
  })
  coupons: Types.ObjectId[];
  @Prop()
  googleId?: string;

  @Prop()
  photoURL?: string;
}

export const userSchema = SchemaFactory.createForClass(User);
