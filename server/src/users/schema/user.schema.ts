import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
  @Prop({ default: "local" }) // 'local' o 'google'
  provider: "local" | "google";

  @Prop() // solo para Google
  googleId?: string;

  @Prop()
  photoURL?: string;
}

export const userSchema = SchemaFactory.createForClass(User);
