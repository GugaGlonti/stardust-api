import { IsString } from 'class-validator';

export class UpdateProfileDataDto {
  @IsString()
  email: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;
}
