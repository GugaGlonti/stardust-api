import { IsString } from 'class-validator';

export class TestNotificationDto {
  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  body: string;
}
