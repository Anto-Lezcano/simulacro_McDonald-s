import { Controller, Get, Param } from "@nestjs/common";
import { MenuService } from "./menu.service";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get("/:tipo")
  async getMenusByType(@Param("tipo") tipo: string) {
    try {
      console.log("Tipo recibido:", tipo);
      const menus = await this.menuService.getMenus(tipo);
      return {
        success: true,
        data: menus,
        count: menus.length,
      };
    } catch (error) {
      console.error("Error en controller:", error);
      return {
        success: false,
        message: "Error al obtener el menú",
        error: error.message,
      };
    }
  }

  @Get()
  async getAllMenus() {
    try {
      const menus = await this.menuService.getMenus();
      return {
        success: true,
        data: menus,
        count: menus.length,
      };
    } catch (error) {
      console.error("Error en controller:", error);
      return {
        success: false,
        message: "Error al obtener el menú completo",
        error: error.message,
      };
    }
  }
}
