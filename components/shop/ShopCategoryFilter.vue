<script lang="ts" setup>
import { useShopStore } from '~/store/shopStore';

const emit = defineEmits(['change']);

const shopStore = useShopStore();

const panels = ref(['category-filter']);

const categoryFiltersOptions = computed(() => shopStore.categoryFiltersOptions);
const categoryFiltersOptionsLoading = computed(
  () => shopStore.categoryFiltersOptionsLoading,
);
const categoryFilters = computed({
  get() {
    return shopStore.categoryFilters;
  },
  set(newValue) {
    shopStore.setCategoryFilters(newValue);
  },
});

function handleFiltersChange() {
  emit('change');
}
</script>

<template>
  <div class="shop-category-filter">
    <v-expansion-panels v-model="panels">
      <v-expansion-panel elevation="0" value="category-filter">
        <v-expansion-panel-title>
          <span class="shop-filters-title">Product Categories</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-if="categoryFiltersOptionsLoading">Loading...</div>
          <div v-else>
            <v-checkbox
              v-for="category in categoryFiltersOptions"
              :key="category.id"
              v-model="categoryFilters"
              :label="category.name"
              :value="category.id"
              density="compact"
              hide-details
              @change="handleFiltersChange"
            ></v-checkbox>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';
</style>
