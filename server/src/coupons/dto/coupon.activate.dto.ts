import { IsString, IsNotEmpty } from "class-validator";

export class CouponActivateDto {
  @IsString()
  @IsNotEmpty({ message: "El codigo es requerido" })
  code_coupon: string;
  @IsString()
  @IsNotEmpty({ message: "El id es requerido" })
  id_user: string;
}
