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

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection
  ) {}

  async renderCouponActive() {
    const coupons = await this.couponModel.find({ activo: true });
    if (!coupons) {
      throw new NotFoundException("No hay cupones activos");
    }
    return coupons;
  }

  async CouponService(dto: CouponActivateDto) {
    // 1. Buscar el cupón
    const coupon = await this.couponModel.findOne({ codigo: dto.code_coupon });
    if (!coupon) {
      throw new NotFoundException("El cupón no existe");
    }

    // 2. Validar si está activo
    if (!coupon.activo) {
      throw new BadRequestException("El cupón no está activo");
    }

    // 3. Validar fecha de expiración
    if (coupon.expiracion < new Date()) {
      throw new BadRequestException("El cupón ha expirado");
    }

    // 4. Buscar usuario y verificar si ya lo canjeó
    const user = await this.userModel.findById(dto.id_user);
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    const couponId = coupon._id as Types.ObjectId;
    const alreadyRedeemed = user.coupons.some((c) =>
      (c as Types.ObjectId).equals(couponId)
    );

    if (alreadyRedeemed) {
      throw new BadRequestException(
        "Este cupón ya fue canjeado por el usuario"
      );
    }

    // 5. Usar transacción para evitar inconsistencias
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      user.coupons.push(couponId);
      await user.save({ session });

      await session.commitTransaction();
      session.endSession();

      return {
        message: "Cupón canjeado exitosamente",
        descuento: coupon.descuento,
        expiracion: coupon.expiracion,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException("Error al canjear el cupón");
    }
  }
}
