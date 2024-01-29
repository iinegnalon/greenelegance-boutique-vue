<script lang="ts" setup>
const route = useRoute();
const slug = route.params.shopItem;

const shopItem = fakeDatabase.shopItems.find((i) => i.slug === slug);
</script>

<template>
  <div class="shop-item-page">
    <div v-if="shopItem">
      <div>{{ shopItem.name }}</div>
    </div>
    <div v-else>Item not found</div>
  </div>
</template>

<style lang="scss" scoped></style>
