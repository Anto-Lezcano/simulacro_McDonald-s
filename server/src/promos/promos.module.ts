import { Module } from "@nestjs/common";
import { PromoSchema, Promo } from "./schema/promos.schema";
import { PromosService } from "./promos.service";
import { PromosController } from "./promos.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Promo.name, schema: PromoSchema }]),
  ],
  controllers: [PromosController],
  providers: [PromosService],
})
export class PromosModule {}
