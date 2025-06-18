import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Coupon, CouponDocument } from "./schema/coupon.schema";
import { User, UserDocument } from "src/users/schema/user.schema";
import { CouponActivateDto } from "./dto/coupon.activate.dto";
import { Types } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { isValidObjectId } from "mongoose";
import { CouponCanjeado, CouponCanjeadoDocument } from "./schema/coupon.canjes";

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(CouponCanjeado.name)
    private cuponCanjeadoModel: Model<CouponCanjeadoDocument>
  ) {}

  async renderCouponActive() {
    const coupons = await this.couponModel.find();
    if (!coupons) {
      throw new NotFoundException("No hay cupones activos");
    }
    return coupons;
  }

  async CouponService(dto: CouponActivateDto) {
    const coupon = await this.couponModel.findOne({ codigo: dto.code_coupon });
    console.log(dto);
    if (!coupon) {
      throw new NotFoundException("El cupón no existe");
    }

    if (coupon.expiracion < new Date()) {
      throw new BadRequestException("El cupón ha expirado");
    }

    let user;
    if (isValidObjectId(dto.id_user)) {
      user = await this.userModel.findById(dto.id_user);
    }
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    const cuponCanjeado = new this.cuponCanjeadoModel({
      user: user._id,
      cupon: coupon._id,
    });
    await cuponCanjeado.save();
    user.coupons.push(coupon._id);
    await user.save();

    return {
      message: `Cupón canjeado exitosamente`,
      descuento: coupon.descuento,
      expiracion: coupon.expiracion,
    };
  }
}
