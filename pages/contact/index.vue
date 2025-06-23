<script lang="ts" setup>
import { ref } from 'vue';
import { isValidEmail, waitFor } from '~/utils';

type ErrorField = 'nameError' | 'emailError' | 'messageError';

const contact = {
  phone: '+123 456 789',
  email: 'info@example.com',
  address: '123 Street, City',
};

const sendLoading = ref(false);
const formData = ref({
  name: '',
  nameError: '',
  email: '',
  emailError: '',
  message: '',
  messageError: '',
});
const notificationSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});

async function submitForm() {
  if (!validateForm()) {
    return;
  }

  sendLoading.value = true;

  await waitFor();

  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'success';
  notificationSnackbar.value.message = 'Message sent successfully!';

  formData.value = {
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    message: '',
    messageError: '',
  };

  sendLoading.value = false;
}

function validateForm() {
  let valid = true;

  if (!formData.value.name) {
    formData.value.nameError = 'Name is required';
    valid = false;
  }

  if (!isValidEmail(formData.value.email)) {
    formData.value.emailError = 'Invalid email format';
    valid = false;
  }

  if (!formData.value.message) {
    formData.value.messageError = 'Message is required';
    valid = false;
  }

  return valid;
}

function clearError(field: ErrorField) {
  formData.value[field] = '';
}
</script>

<template>
  <section class="contact page-width">
    <h1 class="contact__title">Contact Us</h1>

    <div class="contact__container">
      <div class="contact__info-block">
        <h2 class="contact__subtitle">Get in touch</h2>
        <div class="contact__detail">
          <strong>Phone:</strong>
          <NuxtLink :to="`tel:${contact.phone}`">
            {{ contact.phone }}
          </NuxtLink>
        </div>
        <div class="contact__detail">
          <strong>Email:</strong>
          <NuxtLink :to="`mailto:${contact.email}`">
            {{ contact.email }}
          </NuxtLink>
        </div>
        <div class="contact__detail">
          <strong>Address:</strong>
          <NuxtLink
            :to="`https://www.google.com/maps/search/${contact.address}`"
            target="_blank"
          >
            {{ contact.address }}
          </NuxtLink>
        </div>
      </div>

      <div class="contact__map">
        <iframe
          allowfullscreen
          height="100%"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.51%2C-0.11%2C51.52&layer=mapnik"
          style="border: 0; border-radius: 8px"
          title="Address"
          width="100%"
        >
        </iframe>
      </div>
    </div>

    <div class="contact__form">
      <h2 class="contact__subtitle">
        Send a Message
        <v-tooltip text="This is a demo form. Submissions are not processed.">
          <template #activator="{ props }">
            <v-icon class="contact__tooltip-icon" size="small" v-bind="props">
              mdi-help-circle-outline
            </v-icon>
          </template>
        </v-tooltip>
      </h2>

      <v-text-field
        v-model="formData.name"
        :disabled="sendLoading"
        :error-messages="formData.nameError"
        label="Name"
        variant="outlined"
        @keydown="clearError('nameError')"
      />
      <v-text-field
        v-model="formData.email"
        :disabled="sendLoading"
        :error-messages="formData.emailError"
        label="Email"
        required
        type="email"
        variant="outlined"
        @keydown="clearError('emailError')"
      />
      <v-textarea
        v-model="formData.message"
        :disabled="sendLoading"
        :error-messages="formData.messageError"
        label="Message"
        rows="4"
        variant="outlined"
        @keydown="clearError('messageError')"
      />
      <v-btn
        :loading="sendLoading"
        class="contact__submit"
        color="black"
        @click="submitForm"
      >
        Submit
      </v-btn>
    </div>

    <v-snackbar
      v-model="notificationSnackbar.show"
      :color="notificationSnackbar.color"
    >
      {{ notificationSnackbar.message }}
    </v-snackbar>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.contact {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 24px;

  &__title {
    font-size: 24px;
    font-weight: bold;
  }

  &__subtitle {
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__info-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__detail {
    font-size: 14px;
    color: $color-secondary;

    strong {
      display: inline-block;
      min-width: 80px;
    }
  }

  &__map {
    width: 100%;
    height: 200px;
    background-color: $color-background;
    border-radius: 8px;
    overflow: hidden;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__tooltip-icon {
    font-size: 18px;
    cursor: pointer;
    color: $color-gray;
  }

  &__submit {
    width: fit-content;
    text-transform: none;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .contact {
    &__container {
      flex-direction: row;
      gap: 32px;
    }

    &__info-block,
    &__map {
      flex: 1;
    }

    &__map {
      height: 240px;
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .contact {
    &__title {
      font-size: 32px;
    }

    &__subtitle {
      font-size: 20px;
    }

    &__tooltip-icon {
      font-size: 20px;
    }

    &__map {
      height: 300px;
    }
  }
}
</style>
