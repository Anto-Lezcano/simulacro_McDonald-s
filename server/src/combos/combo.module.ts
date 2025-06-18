import { Module } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { ComboController } from "./combo.controller";
import { Combo, ComboSchema } from "./schema/combos.schema";
import { Coupon, CouponSchema } from "src/coupons/schema/coupon.schema";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Combo.name, schema: ComboSchema }]),
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
  ],
  controllers: [ComboController],
  providers: [ComboService],
  exports: [ComboService],
})
export class ComboModule {}
