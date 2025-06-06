<script lang="ts" setup>
import { useShopStore } from '~/store/shopStore';
import { Color } from '~/models/enums/color';

const emit = defineEmits(['change']);

const shopStore = useShopStore();
const colorOptions = Object.values(Color).filter(
  (value) => typeof value === 'string',
);

const panels = ref(['color-filter']);

const colorFilters = computed({
  get() {
    return shopStore.colorFilters;
  },
  set(newValue) {
    shopStore.setColorFilters(newValue);
  },
});

function handleFiltersChange() {
  emit('change');
}
</script>

<template>
  <div class="shop-color-filter">
    <v-expansion-panels v-model="panels">
      <v-expansion-panel elevation="0" value="color-filter">
        <v-expansion-panel-title>
          <span class="shop-filters-title">Filter by Color</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-checkbox
            v-for="color in colorOptions"
            :key="color"
            v-model="colorFilters"
            :value="color"
            density="compact"
            hide-details
            @change="handleFiltersChange"
          >
            <template #label>
              <div class="color-label">
                <span class="shop-filters-label">{{ color }}</span>
                <span
                  :style="{ backgroundColor: Color.toHex(color as Color) }"
                  class="color-swatch"
                ></span>
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

.color-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.color-swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid $color-secondary;
}
</style>
