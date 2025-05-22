<script lang="ts" setup>
import { useShopStore } from '~/store/shopStore';

const emit = defineEmits(['change']);

const shopStore = useShopStore();

const panels = ref(['price-filter']);

const priceFilterMin = computed(() => shopStore.priceFilterMin);
const priceFilterMax = computed(() => shopStore.priceFilterMax);
const priceFilter = computed({
  get() {
    return shopStore.priceFilter;
  },
  set(newValue) {
    shopStore.setPriceFilter(newValue);
  },
});

function handleFiltersChange() {
  emit('change');
}
</script>

<template>
  <div class="shop-category-filter">
    <v-expansion-panels v-model="panels">
      <v-expansion-panel elevation="0" value="price-filter">
        <v-expansion-panel-title>
          <span class="shop-filters-title">Filter by Price</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <span class="shop-filters-label">
            Price: <span>${{ (priceFilter[0] / 100).toFixed(0) }}</span> -
            <span>${{ (priceFilter[1] / 100).toFixed(0) }}</span>
          </span>
          <v-range-slider
            v-model="priceFilter"
            :max="priceFilterMax"
            :min="priceFilterMin"
            step="100"
            thumb-color="#333"
            thumb-size="16"
            track-color="#333"
            track-size="2"
            @end="handleFiltersChange"
          ></v-range-slider>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';
</style>
