import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Types } from "mongoose";
import { Menu, MenuDocument } from "./schema/menu.schema";
@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<MenuDocument>) {}

  async getMenus() {
    const menus = await this.menuModel.find();
    return menus;
  }
}
