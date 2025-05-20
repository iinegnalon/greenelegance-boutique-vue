import type { CategoryDto } from '~/models/dto/categoryDto';
import type { Color } from '~/models/enums/color';
import type { Size } from '~/models/enums/size';

export interface ShopItemDto {
  id: string;
  name: string;
  brand: string;
  description?: string;
  categories: Partial<CategoryDto>[];
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
