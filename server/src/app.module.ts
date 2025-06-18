import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { CouponModule } from "./coupons/coupon.module";
import { ComboModule } from "./combos/combo.module";
import { MenuModule } from "./menu/menu.module";
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/mcdonald"),
    UserModule,
    AuthModule,
    CouponModule,
    ComboModule,
    MenuModule,
  ],
})
export class AppModule {}
