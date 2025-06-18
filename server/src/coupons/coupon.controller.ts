import { Controller, Get, Post, Req, Body } from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CouponActivateDto } from "./dto/coupon.activate.dto";
@Controller("coupons")
export class couponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  async renderCouponActive() {
    return await this.couponService.renderCouponActive();
  }

  @Post("activate")
  async CouponActivateForUser(@Body() dto: CouponActivateDto) {
    return await this.couponService.CouponService(dto);
  }
}
