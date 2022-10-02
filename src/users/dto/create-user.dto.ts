import { Roles } from '../roles.enum';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birth_date: Date;
  adress?: Array<UserAddress>;
  role: Array<Roles>;
}

export interface UserAddress {
  country: string;
  city: string;
  street: string;
  houseNr: number;
  flatNr?: number;
}
