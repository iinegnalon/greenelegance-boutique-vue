<script lang="ts" setup>
import { waitFor } from '~/utils';
import { useUserStore } from '~/store/userStore';
import type { UserDto } from '~/models/dto/userDto';

definePageMeta({
  layout: false,
});

const router = useRouter();
const userStore = useUserStore();

const notificationSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});
const loginData = ref({
  email: 'example@mail.com',
  password: 'secret!Password098',
});
const rememberMe = ref(true);
const loginLoading = ref(false);

async function submitForm() {
  loginLoading.value = true;
  await waitFor();
  loginLoading.value = false;

  if (loginData.value.password.length < 5) {
    notificationSnackbar.value.show = true;
    notificationSnackbar.value.color = 'error';
    notificationSnackbar.value.message = 'Incorrect email or password';
    return;
  }

  const user: UserDto = {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: loginData.value.email,
    address: {
      street: '123 Main St',
      city: 'Town',
      zip: '12345',
    },
  };
  userStore.setUser(user);

  const lastPath = localStorage.getItem('lastVisitedPath') || '/';
  await router.push(lastPath);
}
</script>

<template>
  <div class="login-page">
    <div class="login-image">
      <v-img alt="Login" cover height="100%" src="/images/login.jpg" />
      <NuxtLink class="logo" to="/">
        <v-img alt="Logo" src="~/assets/logo/logo.svg" />
      </NuxtLink>
    </div>

    <form class="login-form" @submit.prevent="submitForm">
      <div class="welcome-text">
        <p class="welcome-text__title">Welcome 👋</p>
        <p class="welcome-text__description">Please login here</p>
      </div>
      <v-text-field
        v-model="loginData.email"
        hide-details
        label="Email"
        required
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="loginData.password"
        hide-details
        label="Password"
        required
        type="password"
      ></v-text-field>
      <v-row align="center" class="login-form__row" justify="space-between">
        <v-checkbox
          v-model="rememberMe"
          class="login-form__remember"
          hide-details
          label="Remember me"
        ></v-checkbox>
        <NuxtLink class="login-form__signup" to="/signup">
          Don't have an account? Sign up
        </NuxtLink>
      </v-row>
      <v-btn
        :loading="loginLoading"
        class="login-button button_primary"
        type="submit"
      >
        Login
      </v-btn>
    </form>

    <v-snackbar
      v-model="notificationSnackbar.show"
      :color="notificationSnackbar.color"
    >
      {{ notificationSnackbar.message }}
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

// Mobile
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  width: 100%;
  background: url('/images/login.jpg') no-repeat 25%;
  background-size: cover;
}

.login-image {
  display: none;
}

.logo {
  display: none;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    margin: 0;
  }

  &__title {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 28px;
    font-weight: bold;
  }

  &__description {
    font-size: 14px;
    opacity: 0.6;
  }
}

.login-form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  background: white;
  border-radius: 12px;

  &__row {
    margin: -12px 0;
  }

  &__remember {
    height: fit-content;
  }

  &__signup {
    font-size: 14px;
    opacity: 0.6;
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .login-page {
    flex-direction: row;
    background: none;
  }

  .login-image {
    display: block;
    position: relative;
    width: 60%;
    height: 100%;
  }

  .logo {
    display: block;
    position: absolute;
    top: 40px;
    left: 40px;
    width: 150px;
    height: 150px;
  }

  .welcome-text {
    gap: 12px;

    &__title {
      font-size: 32px;
    }

    &__description {
      font-size: 16px;
    }
  }

  .login-form {
    width: 42%;
  }
}
</style>
