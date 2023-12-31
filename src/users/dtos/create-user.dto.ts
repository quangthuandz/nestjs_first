
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
  
  @IsString()
  address: string;

}
