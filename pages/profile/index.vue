<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '~/store/userStore';
import type { UserDto } from '~/models/dto/userDto';

definePageMeta({
  middleware: 'auth',
});

const userStore = useUserStore();

const user = computed(() => userStore.user);

const currentTab = ref('general');
const editedUser = ref<UserDto>({
  id: user.value?.id ?? '',
  firstName: user.value?.firstName ?? '',
  lastName: user.value?.lastName ?? '',
  email: user.value?.email ?? '',
  address: {
    street: user.value?.address?.street ?? '',
    city: user.value?.address?.city ?? '',
    zip: user.value?.address?.zip ?? '',
  },
});
const accountLoading = ref(true);
const saveLoading = ref(false);
const errors = ref({
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  zip: '',
});
const notificationSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});

onMounted(() => {
  editedUser.value = { ...user.value };
  accountLoading.value = false;
});

async function saveGeneral() {
  errors.value.firstName = '';
  errors.value.lastName = '';

  let valid = true;

  if (!editedUser.value.firstName.trim()) {
    errors.value.firstName = 'First name is required';
    valid = false;
  }
  if (!editedUser.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required';
    valid = false;
  }

  if (!valid) {
    return;
  }

  saveLoading.value = true;

  await waitFor();

  userStore.setUser({
    ...user.value!,
    firstName: editedUser.value.firstName,
    lastName: editedUser.value.lastName,
  });

  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'success';
  notificationSnackbar.value.message = 'User info saved successfully!';

  saveLoading.value = false;
}

async function saveAddress() {
  errors.value.street = '';
  errors.value.city = '';
  errors.value.zip = '';

  let valid = true;

  if (!editedUser.value.address.street?.trim()) {
    errors.value.street = 'Street is required';
    valid = false;
  }
  if (!editedUser.value.address.city?.trim()) {
    errors.value.city = 'City is required';
    valid = false;
  }
  if (!editedUser.value.address.zip?.trim()) {
    errors.value.zip = 'ZIP is required';
    valid = false;
  }

  if (!valid) {
    return;
  }

  saveLoading.value = true;

  await waitFor();

  userStore.setUser({
    ...user.value!,
    address: { ...editedUser.value.address },
  });

  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'success';
  notificationSnackbar.value.message = 'Address saved successfully!';

  saveLoading.value = false;
}

function changeTab(newTab: string) {
  currentTab.value = newTab;
}
</script>

<template>
  <div v-if="!accountLoading" class="account-page page-width">
    <div class="account-page__sidebar">
      <button
        :class="{ 'account-page__tab--active': currentTab === 'general' }"
        class="account-page__tab"
        @click="changeTab('general')"
      >
        General Info
      </button>
      <button
        :class="{ 'account-page__tab--active': currentTab === 'address' }"
        class="account-page__tab"
        @click="changeTab('address')"
      >
        Address
      </button>
      <button
        :class="{ 'account-page__tab--active': currentTab === 'favorites' }"
        class="account-page__tab"
        @click="changeTab('favorites')"
      >
        Favorites
      </button>
    </div>

    <div class="account-page__content">
      <div v-if="currentTab === 'general'" class="account-page__section">
        <h2 class="account-page__section-title">General Information</h2>
        <v-text-field
          v-model="editedUser.email"
          disabled
          label="Email"
          variant="outlined"
        />
        <v-text-field
          v-model="editedUser.firstName"
          :error-messages="errors.firstName"
          label="First Name"
          required
          variant="outlined"
        />
        <v-text-field
          v-model="editedUser.lastName"
          :error-messages="errors.lastName"
          label="Last Name"
          required
          variant="outlined"
        />
        <v-btn :loading="saveLoading" color="black" @click="saveGeneral">
          Save
        </v-btn>
      </div>

      <div v-else-if="currentTab === 'address'" class="account-page__section">
        <h2 class="account-page__section-title">Shipping Address</h2>
        <v-text-field
          v-model="editedUser.address.street"
          :error-messages="errors.street"
          label="Street"
          required
          variant="outlined"
        />
        <v-text-field
          v-model="editedUser.address.city"
          :error-messages="errors.city"
          label="City"
          required
          variant="outlined"
        />
        <v-text-field
          v-model="editedUser.address.zip"
          :error-messages="errors.zip"
          label="ZIP"
          required
          variant="outlined"
        />
        <v-btn
          :loading="saveLoading"
          color="black"
          type="submit"
          @click="saveAddress"
        >
          Save
        </v-btn>
      </div>

      <div v-else-if="currentTab === 'favorites'" class="account-page__section">
        <h2 class="account-page__section-title">Favorites</h2>
        <div>You haven't added any items to your favorites yet</div>
      </div>
    </div>

    <v-snackbar
      v-model="notificationSnackbar.show"
      :color="notificationSnackbar.color"
    >
      {{ notificationSnackbar.message }}
    </v-snackbar>
  </div>

  <div v-else class="account-page page-width">
    <v-progress-circular
      color="black"
      indeterminate
      size="32"
    ></v-progress-circular>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.account-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: center;
  width: 100%;

  &__sidebar {
    display: flex;
    gap: 8px;
    align-self: center;
    flex-wrap: wrap;
  }

  &__tab {
    padding: 8px 12px;
    background: white;
    border: 1px solid $color-background;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    transition: 0.25s;

    &--active {
      background: black;
      color: white;
    }
  }

  &__content {
    background: white;
    border: 1px solid $color-background;
    border-radius: 4px;
    padding: 16px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__section-title {
    font-size: 18px;
    font-weight: bold;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .account-page {
    flex-direction: row;
    justify-content: space-between;

    &__sidebar {
      flex-direction: column;
      width: 200px;
      align-self: flex-start;
    }

    &__content {
      flex: 1;
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .account-page {
    max-width: 1400px;

    &__section-title {
      font-size: 24px;
    }
  }
}
</style>
