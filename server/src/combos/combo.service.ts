import { Combo, ComboDocument } from "./schema/combos.schema";
import { Coupon, CouponDocument } from "src/coupons/schema/coupon.schema";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ComboWithDiscount } from "./combo-with-discount.interface";
import { Types } from "mongoose";
@Injectable()
export class ComboService {
  constructor(
    @InjectModel(Combo.name) private comboModel: Model<ComboDocument>,
    @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>
  ) {}

  async getCombos() {
    const combos = await this.comboModel.find();
    if (!combos) {
      throw new NotFoundException("No se encontraron combos disponibles");
    }
    return combos;
  }

  async getComboForCoupon() {
    const combos = await this.comboModel.find();

    if (!combos || combos.length === 0) {
      throw new NotFoundException("No se encontraron combos disponibles");
    }

    const comboList: ComboWithDiscount[] = [];

    console.log("COMBOS", combos);
    for (const combo of combos) {
      const couponsForCombo = await this.couponModel.find({
        combos: { $in: [combo._id as Types.ObjectId] },
      });
    }

    for (const combo of combos) {
      const couponsForCombo = await this.couponModel.find({
        combos: { $in: [combo._id as Types.ObjectId] },
      });

      const validCoupon = couponsForCombo.find(
        (c) => new Date(c.expiracion) > new Date()
      );

      if (validCoupon) {
        const precioOriginal = combo.precio;
        const precioConDescuento = Math.round(
          precioOriginal * (1 - validCoupon.descuento / 100)
        );

        comboList.push({
          nombre: combo.nombre,
          imagen: combo.imagen,
          precioOriginal,
          precioConDescuento,
          descuentoAplicado: validCoupon.descuento,
          cupon: validCoupon.codigo,
        });
      } else {
        comboList.push({
          nombre: combo.nombre,
          imagen: combo.imagen,
          precioOriginal: combo.precio,
          precioConDescuento: combo.precio,
          descuentoAplicado: 0,
          cupon: null,
        });
      }
    }

    return { combos: comboList };
  }
}
