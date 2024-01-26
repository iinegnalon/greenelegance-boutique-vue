import type { ShopItemDto } from '~/models/dto/shopItemDto';
import { Color } from '~/models/enums/color';
import { Size } from '~/models/enums/size';
import type { CategoryDto } from '~/models/dto/categoryDto';

interface FakeDatabase {
  shopItems: ShopItemDto[];
  categories: CategoryDto[];
}

export const fakeDatabase: FakeDatabase = {
  shopItems: [
    {
      id: '1',
      name: 'Classic T-Shirt',
      description: 'A comfortable and stylish classic t-shirt.',
      categories: [{ name: 'Clothing' }, { name: 'T-Shirts' }],
      colors: [Color.Red, Color.Blue, Color.Green],
      sizes: [Size.XXL, Size.XL, Size.L],
      price: 2999,
      discountedPrice: 2499,
      stock: 50,
    },
    {
      id: '2',
      name: 'Sporty Sneakers',
      description:
        'High-performance sporty sneakers for your active lifestyle.',
      categories: [{ name: 'Footwear' }, { name: 'Sneakers' }],
      colors: [Color.Yellow, Color.Purple, Color.Orange],
      sizes: [Size.M, Size.S],
      price: 3999,
      stock: 30,
    },
    {
      id: '3',
      name: 'Elegant Watch',
      description: 'An elegant and stylish watch for any occasion.',
      categories: [{ name: 'Accessories' }, { name: 'Watches' }],
      colors: [Color.Black, Color.White, Color.Yellow],
      sizes: [Size.M],
      price: 9999,
      stock: 20,
    },
    {
      id: '4',
      name: 'Casual Jeans',
      description: 'Comfortable and stylish jeans for a casual look.',
      categories: [{ name: 'Clothing' }, { name: 'Jeans' }],
      colors: [Color.Blue, Color.Black, Color.Gray],
      sizes: [Size.XL, Size.L, Size.M],
      price: 4999,
      stock: 25,
    },
    {
      id: '5',
      name: 'Running Shoes',
      description: 'Lightweight and durable shoes for your running sessions.',
      categories: [{ name: 'Footwear' }, { name: 'Sneakers' }],
      colors: [Color.Blue, Color.Green, Color.Gray],
      sizes: [Size.M, Size.L, Size.XL],
      price: 5999,
      discountedPrice: 5499,
      stock: 40,
    },
    {
      id: '6',
      name: 'Leather Handbag',
      description: 'A classic leather handbag to complement your style.',
      categories: [{ name: 'Accessories' }, { name: 'Handbags' }],
      colors: [Color.Blue, Color.Black, Color.White],
      sizes: [Size.L],
      price: 7999,
      stock: 15,
    },
  ],
  categories: [
    {
      id: '1',
      name: 'Clothing',
      slug: 'clothing',
      image: '/_nuxt/assets/images/categories/clothing.png',
    },
    {
      id: '2',
      name: 'Footwear',
      slug: 'footwear',
      image: '/_nuxt/assets/images/categories/footwear.png',
    },
    {
      id: '3',
      name: 'Sneakers',
      slug: 'sneakers',
      image: '/_nuxt/assets/images/categories/sneakers.png',
    },
    {
      id: '4',
      name: 'Accessories',
      slug: 'accessories',
      image: '/_nuxt/assets/images/categories/accessories.png',
    },
    {
      id: '5',
      name: 'Watches',
      slug: 'watches',
      image: '/_nuxt/assets/images/categories/watches.png',
    },
    {
      id: '6',
      name: 'Jeans',
      slug: 'jeans',
      image: '/_nuxt/assets/images/categories/jeans.png',
    },
    {
      id: '7',
      name: 'Handbags',
      slug: 'handbags',
      image: '/_nuxt/assets/images/categories/handbags.png',
    },
  ],
};
