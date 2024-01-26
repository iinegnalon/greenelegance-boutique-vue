<script lang="ts" setup>
import { isValidEmail } from '~/utils';

const emailInput = ref('example@mail.com');
const subscriptionSnackbarSuccess = ref(false);
const subscriptionSnackbarError = ref(false);
const subscriptionLoading = ref(false);

async function subscribe() {
  if (!isValidEmail(emailInput.value)) {
    subscriptionSnackbarError.value = true;
    return;
  }

  subscriptionLoading.value = true;

  // Fake loading
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  subscriptionSnackbarSuccess.value = true;

  subscriptionLoading.value = false;
}
</script>

<template>
  <footer class="footer">
    <div class="footer__left">
      <NuxtLink class="footer__logo" to="/">
        <img alt="Logo" class="logo" src="~/assets/logo/logo-light.svg" />
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
      v-model="subscriptionSnackbarSuccess"
      :timeout="2000"
      color="success"
    >
      Subscription successful! Email: {{ emailInput }}
    </v-snackbar>
    <v-snackbar
      v-model="subscriptionSnackbarError"
      :timeout="2000"
      color="error"
    >
      Invalid email
    </v-snackbar>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

.footer {
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: white;
  background: black;

  &__left,
  &__center,
  &__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  &__left {
    img {
      width: 80px;
    }
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

  @media screen and (min-width: $desktop-breakpoint) {
    flex-direction: row;
    justify-content: space-between;

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

@media screen and (min-width: $desktop-breakpoint) {
  .footer {
    padding: 20px 100px;
  }
}
</style>