import { Module } from "@nestjs/common";
import { FirebaseModule } from "src/firebase/firebase.module";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "./strategy/jwt.module";
import { User, userSchema } from "src/users/schema/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FirebaseService } from "src/firebase/firebase.service";
@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FirebaseService],
})
export class AuthModule {}
