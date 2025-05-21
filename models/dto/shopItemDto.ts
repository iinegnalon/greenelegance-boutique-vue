import type { Color } from '~/models/enums/color';
import type { Size } from '~/models/enums/size';

interface CategoryDtoPartial {
  id: string;
  name: string;
}

export interface ShopItemDto {
  id: string;
  name: string;
  brand: string;
  description?: string;
  categories: CategoryDtoPartial[];
  colors: Color[];
  sizes: Size[];
  price: number;
  discountedPrice?: number;
  stock: number;
  image: string;
  slug: string;
  dateCreated: number;
  dateUpdated: number;
}
