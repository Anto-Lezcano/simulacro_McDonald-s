import { Controller, Get } from "@nestjs/common";
import { ComboService } from "./combo.service";

@Controller("combos")
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Get()
  getCombos() {
    return this.comboService.getCombos();
  }
}
