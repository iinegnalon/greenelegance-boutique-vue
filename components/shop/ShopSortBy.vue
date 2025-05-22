<script lang="ts" setup>
import { useShopStore } from '~/store/shopStore';

const emit = defineEmits(['change']);

const shopStore = useShopStore();
const sortByOptions = shopStore.sortByOptions;

const sortBy = computed({
  get() {
    return shopStore.sortBy;
  },
  set(newValue) {
    shopStore.setSortBy(newValue);
  },
});

function handleSortByUpdate() {
  emit('change');
}
</script>

<template>
  <v-select
    v-model="sortBy"
    :items="sortByOptions"
    class="sort-by-select"
    hide-details
    label="Sort by"
    outlined
    variant="plain"
    @update:model-value="handleSortByUpdate"
  ></v-select>
</template>

<style lang="scss" scoped></style>
