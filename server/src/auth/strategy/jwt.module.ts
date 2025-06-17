import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    NestJwtModule.register({
      secret: "jwt_secret",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [JwtStrategy],
  exports: [NestJwtModule, JwtStrategy],
})
export class JwtModule {}
