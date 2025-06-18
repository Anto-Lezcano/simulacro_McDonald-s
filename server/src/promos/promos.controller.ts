import { Controller, Get, Body, Post } from "@nestjs/common";
import { PromosService } from "./promos.service";
@Controller("promos")
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Get("promo-tipo")
  async getPromoForType(@Body("type") type: string) {
    return await this.promosService.getPromoForType(type);
  }
}
