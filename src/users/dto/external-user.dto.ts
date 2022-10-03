import { Roles } from '../../shared/enums/roles.enum';

export class ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address?: Array<ExternalUserAddress>;
  role: Roles[];
}

export class ExternalUserAddress {
  country: string;
  city: string;
  street: string;
  apartment: number;
  house: number;
}
