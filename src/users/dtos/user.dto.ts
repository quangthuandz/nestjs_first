import { Expose } from 'class-transformer';

export class UserDto {
  
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  phone: string;
  
  @Expose()
  address: string;

}
