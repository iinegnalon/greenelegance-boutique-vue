import { defineStore } from 'pinia';
import type { CategoryDto } from '~/models/dto/categoryDto';

interface SortByOption {
  title: string;
  value: string;
}

interface ShopStore {
  sortBy: string;
  sortByOptions: SortByOption[];
  categoryFilters: string[];
  categoryFiltersOptions: CategoryDto[];
  categoryFiltersOptionsLoading: boolean;
  priceFilterMin: number;
  priceFilterMax: number;
  colorFilters: string[];
  sizeFilters: string[];
}

const sortByOptions: SortByOption[] = [
  { title: 'Date: Newest', value: 'date-desc' },
  { title: 'Date: Oldest', value: 'date-asc' },
  { title: 'Price: High to Low', value: 'price-desc' },
  { title: 'Price: Low to High', value: 'price-asc' },
  { title: 'Name: A - Z', value: 'name-asc' },
  { title: 'Name: Z - A', value: 'name-desc' },
];

export const useShopStore = defineStore({
  id: 'shop',
  state: (): ShopStore => ({
    sortBy: 'date-desc',
    sortByOptions,
    categoryFilters: [],
    categoryFiltersOptions: [],
    categoryFiltersOptionsLoading: false,
    priceFilterMin: 0,
    priceFilterMax: 10000000,
    colorFilters: [],
    sizeFilters: [],
  }),
  actions: {
    setSortBy(sortBy: string) {
      this.sortBy = sortBy;
    },

    setCategoryFilters(categoryFilters: string[]) {
      this.categoryFilters = categoryFilters;
    },

    setCategoryFiltersOptions(categoryFiltersOptions: CategoryDto[]) {
      this.categoryFiltersOptions = categoryFiltersOptions;
    },

    setCategoryFiltersOptionsLoading(categoryFiltersOptionsLoading: boolean) {
      this.categoryFiltersOptionsLoading = categoryFiltersOptionsLoading;
    },

    setPriceFilter(priceFilterMin = 0, priceFilterMax = 10000000) {
      this.priceFilterMin = priceFilterMin;
      this.priceFilterMax = priceFilterMax;
    },

    setColorFilters(colorFilters: string[]) {
      this.colorFilters = colorFilters;
    },

    setSizeFilters(sizeFilters: string[]) {
      this.sizeFilters = sizeFilters;
    },
  },
});
