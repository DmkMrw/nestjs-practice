import { Roles } from '../enums/roles.enum';
import { TextFilterType } from '../../shared/helpers/TextFilter';

export interface UsersQuery {
  firstName?: string;
  lastName?: string;
  email?: string;
  nameFilterType?: TextFilterType;
  dateOfBirthLaterThan?: Date;
  dateOfBirthEarlierThan?: Date;
  role?: Roles[];
}
