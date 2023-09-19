

import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  
  @IsString()
  @IsOptional()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;
  
  @IsOptional()
  @IsString()
  address: string;

}
