import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: "El nombre de usuario es requerido" })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: "El correo electronico es requerido" })
  mail: string;

  @IsString()
  @IsNotEmpty({ message: "La contraseña es requerida" })
  password: string;
}

export class UserRegisterDto extends UserDto {}
