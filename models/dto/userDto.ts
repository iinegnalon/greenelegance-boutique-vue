import type { AddressDto } from '~/models/dto/addressDto';

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: AddressDto;
}
