import { Module } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { ComboController } from "./combo.controller";
import { Combo, ComboSchema } from "./schema/combos.schema";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Combo.name, schema: ComboSchema }]),
  ],
  controllers: [ComboController],
  providers: [ComboService],
  exports: [ComboService],
})
export class ComboModule {}
