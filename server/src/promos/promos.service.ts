import { Promo, PromoDocument } from "./schema/promos.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PromosService {
  constructor(
    @InjectModel(Promo.name) private readonly promoModel: Model<PromoDocument>
  ) {}

  async getPromos() {
    return await this.promoModel.find();
  }

  async getPromoForType(type: string) {
    const promo = await this.promoModel.find({ tipo: type });
    return promo;
  }
}
