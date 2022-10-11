import { Roles } from '../../shared/enums/roles.enum';
import { UserAddress } from '../db/users-addresses.entity';

export class ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address?: UserAddress[];
  role: Roles[];
}

export class ExternalUserAddress {
  country: string;
  city: string;
  street: string;
  number: number;
  house: number;
}
