import { Module } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Coupon, CouponSchema } from "./schema/coupon.schema";
import { User, userSchema } from "src/users/schema/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
