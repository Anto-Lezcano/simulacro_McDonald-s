import { Controller, Post, Body, Res, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user.login-dto";
import { UserRegisterDto } from "./dto/user.dto";
import { Response } from "express";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async Login(@Body() loginDto: UserLoginDto, @Res() res: Response) {
    const result = await this.authService.Login(loginDto);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.send({
      message: result.message,
    });
  }

  @Post("register")
  async Register(@Body() registerDto: UserRegisterDto) {
    return this.authService.Register(registerDto);
  }

  @Post("google")
  async loginWithGoogle(
    @Body("idToken") idToken: string,
    @Res() res: Response
  ) {
    const result = await this.authService.loginWithGoogle(idToken);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.send({
      message: result.message,
    });
  }

  @Get("logout")
  async logout(@Res() res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return res.send({ message: "Sesión cerrada correctamente" });
  }
}
