import { Tags } from '../tags.enum';

export interface CreateProductDTO {
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
}
