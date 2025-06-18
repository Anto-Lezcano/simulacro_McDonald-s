import { Combo, ComboDocument } from "./schema/combos.schema";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ComboService {
  constructor(
    @InjectModel(Combo.name) private comboModel: Model<ComboDocument>
  ) {}

  async getCombos() {
    const combos = await this.comboModel.find();
    if (!combos) {
      throw new NotFoundException("No se encontraron combos disponibles");
    }
    return combos;
  }
}
