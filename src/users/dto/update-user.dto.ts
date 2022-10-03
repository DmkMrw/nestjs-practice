import { Roles } from '../enums/roles.enum';

export interface UpdateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address: Array<UpdateUserAddress>;
  role: Array<Roles>;
}

export class UpdateUserAddress {
  country: string;
  city: string;
  street: string;
  apartment: number;
  house: number;
}
