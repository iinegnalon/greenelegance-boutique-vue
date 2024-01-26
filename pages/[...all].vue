<script lang="ts" setup>
definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="error-page">
    <div class="error-page__container">
      <h1 class="error-page__title">404</h1>
      <p class="error-page__message">Oops! Page not found.</p>
      <nuxt-link class="error-page__link" to="/">
        Go back to the home page
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;

  &__container {
    text-align: center;
  }

  &__title {
    font-size: 4rem;
    margin-bottom: 10px;
    color: #ff5c5c;
  }

  &__message {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  &__link {
    color: #2a7ae2;
    text-decoration: underline;
  }
}
</style>
