<script lang="ts" setup>
import { useShopStore } from '~/store/shopStore';
import { Size } from '~/models/enums/size';

const emit = defineEmits(['change']);

const shopStore = useShopStore();
const sizeOptions = Object.values(Size).filter((value) => value !== Size.None);

const panels = ref(['size-filter']);

const sizeFilters = computed({
  get() {
    return shopStore.sizeFilters;
  },
  set(newValue) {
    shopStore.setSizeFilters(newValue);
  },
});

function handleFiltersChange() {
  emit('change');
}
</script>

<template>
  <div class="shop-size-filter">
    <v-expansion-panels v-model="panels">
      <v-expansion-panel elevation="0" value="size-filter">
        <v-expansion-panel-title>
          <span class="shop-filters-title">Filter by Size</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-checkbox
            v-for="size in sizeOptions"
            :key="size"
            v-model="sizeFilters"
            :value="size"
            density="compact"
            hide-details
            @change="handleFiltersChange"
          >
            <template #label>
              <div class="size-label">
                <span class="shop-filters-label">{{ size }}</span>
              </div>
            </template>
          </v-checkbox>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';
</style>
