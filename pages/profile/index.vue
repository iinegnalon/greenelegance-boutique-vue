<script lang="ts" setup>
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();
</script>

<template>
  <div>
    <div>Profile</div>
    <div>{{ userStore.user?.firstName }}</div>
    <div>{{ userStore.user?.lastName }}</div>
    <div>{{ userStore.user?.email }}</div>
  </div>
</template>

<style scoped></style>
