<script lang="ts" setup>
import { isValidEmail, waitFor } from '~/utils';

const emailInput = ref('example@mail.com');
const subscriptionSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});
const subscriptionLoading = ref(false);

async function subscribe() {
  if (!isValidEmail(emailInput.value)) {
    subscriptionSnackbar.value.show = true;
    subscriptionSnackbar.value.color = 'error';
    subscriptionSnackbar.value.message = 'Invalid email format';
    return;
  }

  subscriptionLoading.value = true;

  // Fake loading
  await waitFor();
  subscriptionSnackbar.value.show = true;
  subscriptionSnackbar.value.color = 'success';
  subscriptionSnackbar.value.message = `Subscription successful! Email: ${emailInput.value}`;

  subscriptionLoading.value = false;
}
</script>

<template>
  <footer class="footer">
    <div class="footer__left">
      <NuxtLink class="footer__logo" to="/">
        <v-img alt="Logo" class="logo" src="~/assets/logo/logo-light.svg" />
      </NuxtLink>
      <div class="footer__contact">
        <NuxtLink class="footer__phone" to="tel:+123 456 789">
          Phone: +123 456 789
        </NuxtLink>
        <NuxtLink class="footer__email" to="mailto:info@example.com">
          Email: info@example.com
        </NuxtLink>
        <NuxtLink
          class="footer__address"
          target="_blank"
          to="https://www.google.com/maps/search/123+Street,+City"
        >
          Address: 123 Street, City
        </NuxtLink>
      </div>
    </div>

    <div class="footer__center">
      <NuxtLink class="footer__link" to="/">Home</NuxtLink>
      <NuxtLink class="footer__link" to="/shop">Shop</NuxtLink>
      <NuxtLink class="footer__link" to="/contact">Contact Us</NuxtLink>
    </div>

    <div class="footer__right">
      <div class="footer__subscribe">
        <v-text-field
          id="emailInput"
          v-model="emailInput"
          class="footer__input"
          label="Subscribe to our newsletter:"
          placeholder="Your email"
          type="email"
          @keydown.enter="subscribe"
        />
        <v-btn
          :loading="subscriptionLoading"
          class="footer__subscribe-button"
          color="white"
          @click="subscribe"
        >
          Subscribe
        </v-btn>
      </div>
      <NuxtLink
        class="footer__attribution"
        target="_blank"
        to="https://www.freepik.com"
      >
        Icons and images created by Freepik
      </NuxtLink>
    </div>

    <v-snackbar
      v-model="subscriptionSnackbar.show"
      :color="subscriptionSnackbar.color"
    >
      {{ subscriptionSnackbar.message }}
    </v-snackbar>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

// Mobile
.footer {
  @extend .page-width;

  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
  background: black;
  margin-top: 20px;

  &__left,
  &__center,
  &__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  &__logo {
    width: 80px;
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__input {
    width: 250px;
  }

  &__subscribe {
    display: flex;
    flex-direction: column;
  }

  &__attribution,
  &__contact {
    font-size: 12px;
  }

  &__link {
    @include underline-hover(white);
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .footer {
    margin-top: 32px;
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .footer {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 40px;

    &__left,
    &__center,
    &__right {
      margin-bottom: 0;
      align-items: start;
    }

    &__left {
    }

    &__center {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: fit-content;
    }

    &__right {
      display: flex;
      justify-content: flex-end;
    }

    &__attribution,
    &__contact {
      font-size: 16px;
    }
  }
}
</style>
