import { UserDto } from "./user.dto";
import { OmitType } from "@nestjs/mapped-types";

export class UserLoginDto extends OmitType(UserDto, ["username"] as const) {}
