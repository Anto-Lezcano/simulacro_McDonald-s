import { IsString } from "class-validator";

export class NotificationDto {
  @IsString()
  title: string;
  @IsString()
  body: string;
}
