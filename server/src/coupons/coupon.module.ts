import { Module } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { couponController } from "./coupon.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Coupon, CouponSchema } from "./schema/coupon.schema";
import { User, userSchema } from "src/users/schema/user.schema";
import { CouponCanjeado, CouponCanjeadoSchema } from "./schema/coupon.canjes";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([
      { name: CouponCanjeado.name, schema: CouponCanjeadoSchema },
    ]),
  ],
  controllers: [couponController],
  providers: [CouponService],
  exports: [
    CouponService,
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
  ],
})
export class CouponModule {}
