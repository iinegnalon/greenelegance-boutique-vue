<script lang="ts" setup>
import { isValidEmail, waitFor } from '~/utils';
import type { UserDto } from '~/models/dto/userDto';
import { useUserStore } from '~/store/userStore';

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
const signupData = ref({
  firstName: 'John',
  lastName: 'Smith',
  email: 'example@mail.com',
  password: 'secret!Password098',
});
const agreeTerms = ref(false);
const signupLoading = ref(false);

async function submitForm() {
  signupLoading.value = true;
  await waitFor();
  signupLoading.value = false;

  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'error';

  if (!isValidEmail(signupData.value.email)) {
    notificationSnackbar.value.message = 'Invalid email format';
    return;
  }

  if (signupData.value.password.length < 5) {
    notificationSnackbar.value.message =
      'Password must contain 5 or more symbols';
    return;
  }

  notificationSnackbar.value.color = 'success';
  notificationSnackbar.value.message = 'Account was created successfully!';

  await waitFor();

  const user: UserDto = {
    id: '1',
    firstName: signupData.value.firstName,
    lastName: signupData.value.lastName,
    email: signupData.value.email,
  };
  userStore.setUser(user);

  const lastPath = localStorage.getItem('lastVisitedPath') || '/';
  await router.push(lastPath);
}
</script>

<template>
  <div class="signup-page">
    <div class="signup-image">
      <v-img alt="signup" cover height="100%" src="/images/signup.jpg" />
      <NuxtLink class="logo" to="/">
        <v-img alt="Logo" src="~/assets/logo/logo.svg" />
      </NuxtLink>
    </div>

    <form class="signup-form" @submit.prevent="submitForm">
      <div class="creation-text">
        <p class="creation-text__title">Create New Account</p>
        <p class="creation-text__description">Please enter details</p>
      </div>
      <v-text-field
        v-model="signupData.firstName"
        hide-details
        label="First Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="signupData.lastName"
        hide-details
        label="Last Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="signupData.email"
        hide-details
        label="Email"
        required
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="signupData.password"
        hide-details
        label="Password"
        required
        type="password"
      ></v-text-field>
      <v-checkbox
        v-model="agreeTerms"
        class="signup-form__remember"
        hide-details
      >
        <template #label>
          <div>
            I agree to the
            <v-tooltip location="bottom">
              <template #activator="{ props }">
                <NuxtLink
                  class="signup-form__link"
                  href="/terms-and-conditions"
                  target="_blank"
                  v-bind="props"
                  @click.stop
                >
                  Terms & Conditions
                </NuxtLink>
              </template>
              Opens in new window
            </v-tooltip>
          </div>
        </template>
      </v-checkbox>
      <v-btn
        :disabled="!agreeTerms"
        :loading="signupLoading"
        class="signup-button button_primary"
        type="submit"
      >
        Sign Up
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
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  width: 100%;
  background: url('/images/signup.jpg') no-repeat 50%;
  background-size: cover;
}

.signup-image {
  display: none;
}

.logo {
  display: none;
}

.creation-text {
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

.signup-form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  background: white;
  border-radius: 12px;

  &__remember {
    height: fit-content;
  }

  &__signup {
    font-size: 14px;
    opacity: 0.6;
  }

  &__link {
    font-weight: bold;
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .signup-page {
    flex-direction: row;
    background: none;
  }

  .signup-image {
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

  .creation-text {
    gap: 12px;

    &__title {
      font-size: 32px;
    }

    &__description {
      font-size: 16px;
    }
  }

  .signup-form {
    width: 42%;
  }
}
</style>
