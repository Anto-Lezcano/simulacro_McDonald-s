import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Menu, MenuDocument } from "./schema/menu.schema";

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<MenuDocument>) {}

  async getMenus(tipo?: string) {
    try {
      const filter = tipo ? { tipo } : {};
      const result = await this.menuModel.find(filter).lean().exec();
      return result;
    } catch (error) {
      console.error("Error en service:", error);
      throw error;
    }
  }
}
