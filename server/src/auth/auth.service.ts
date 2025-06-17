import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/users/schema/user.schema";
import { UserLoginDto } from "./dto/user.login-dto";
import { UserRegisterDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { FirebaseService } from "src/firebase/firebase.service";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private firebaseService: FirebaseService
  ) {}

  async Register(registerDto: UserRegisterDto) {
    const mailExist = await this.userModel.findOne({ mail: registerDto.mail });
    if (mailExist) {
      throw new BadRequestException("El correo electronico ya esta registrado");
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const createUser = new this.userModel({
      ...registerDto,
      password: hashedPassword,
      provider: "local",
    });
    await createUser.save();
    return {
      message: "Usuario registrado exitosamente",
      createUser,
    };
  }
  async Login(loginDto: UserLoginDto) {
    const user = await this.userModel.findOne({ mail: loginDto.mail });
    if (!user) {
      throw new NotFoundException("El correo electronico no esta registrado");
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    const payload = {
      sub: user._id,
      mail: user.mail,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: "Inicio de sesion exitoso",
      token,
    };
  }

  async loginWithGoogle(idToken: string) {
    const decoded = await this.firebaseService.verifyToken(idToken);
    let user = await this.userModel.findOne({ mail: decoded.email });
    if (!user) {
      user = new this.userModel({
        username: decoded.name,
        mail: decoded.email,
        password: "-",
        provider: "google",
        googleId: decoded.uid,
      });
      await user.save();
    }
    const payload = {
      sub: user._id,
      mail: user.mail,
    };
    const token = this.jwtService.sign(payload);
    return {
      message: "Inicio de sesión exitoso",
      token,
    };
  }
}
