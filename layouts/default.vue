<script lang="ts" setup></script>

<template>
  <div>
    <LayoutHeader />
    <div class="main-content">
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  padding: 32px;
}
</style>
