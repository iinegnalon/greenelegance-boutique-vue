<script lang="ts" setup>
import ShopCategoryFilter from '~/components/shop/ShopCategoryFilter.vue';
import ShopPriceFilter from '~/components/shop/ShopPriceFilter.vue';
import ShopColorFilter from '~/components/shop/ShopColorFilter.vue';
import ShopSizeFilter from '~/components/shop/ShopSizeFilter.vue';

const emit = defineEmits(['change']);

function handleFiltersChange() {
  emit('change');
}
</script>

<template>
  <section class="shop-filters">
    <ShopCategoryFilter @change="handleFiltersChange" />
    <ShopPriceFilter @change="handleFiltersChange" />
    <ShopColorFilter @change="handleFiltersChange" />
    <ShopSizeFilter @change="handleFiltersChange" />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

// Mobile
.shop-filters {
  ::v-deep(
      .v-expansion-panel-title--active > .v-expansion-panel-title__overlay
    ) {
    opacity: 0;
  }

  ::v-deep(
      .v-expansion-panel-title--active:hover > .v-expansion-panel-title__overlay
    ) {
    opacity: 0.04;
  }

  ::v-deep(.v-label) {
    opacity: 1;
    width: 100%;
  }
}

.shop-filters {
  display: none;
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .shop-filters {
    display: block;
    width: 300px;
  }
}
</style>
