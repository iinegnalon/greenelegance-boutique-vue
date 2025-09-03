<script lang="ts" setup>
import { ref } from 'vue';
import ProfileGeneralTab from '~/components/profile/ProfileGeneralTab.vue';
import ProfileAddressTab from '~/components/profile/ProfileAddressTab.vue';
import ProfileFavoritesTab from '~/components/profile/ProfileFavoritesTab.vue';
import type { ShopItemDto } from '~/models/dto/shopItemDto';

definePageMeta({
  middleware: 'auth',
});

const currentTab = ref('general');
const profileLoading = ref(true);
const notificationSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});

onMounted(() => {
  profileLoading.value = false;
});

function changeTab(newTab: string) {
  currentTab.value = newTab;
}

function showNotification(message: string) {
  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'success';
  notificationSnackbar.value.message = message;
}

function handleGeneralSave() {
  showNotification('User info saved successfully!');
}

function handleAddressSave() {
  showNotification('Address saved successfully!');
}

function handleFavorite(value: boolean, shopItem: ShopItemDto) {
  if (value) {
    showNotification(`Added "${shopItem.name}" to Favorites`);
    return;
  }

  showNotification(`Removed "${shopItem.name}" from Favorites`);
}
</script>

<template>
  <div v-if="!profileLoading" class="profile-page page-width">
    <div class="profile-page__sidebar">
      <button
        :class="{ 'profile-page__tab--active': currentTab === 'general' }"
        class="profile-page__tab"
        @click="changeTab('general')"
      >
        General Info
      </button>
      <button
        :class="{ 'profile-page__tab--active': currentTab === 'address' }"
        class="profile-page__tab"
        @click="changeTab('address')"
      >
        Address
      </button>
      <button
        :class="{ 'profile-page__tab--active': currentTab === 'favorites' }"
        class="profile-page__tab"
        @click="changeTab('favorites')"
      >
        Favorites
      </button>
    </div>

    <div class="profile-page__content">
      <ProfileGeneralTab
        v-if="currentTab === 'general'"
        @save="handleGeneralSave"
      />

      <ProfileAddressTab
        v-else-if="currentTab === 'address'"
        @save="handleAddressSave"
      />

      <ProfileFavoritesTab
        v-else-if="currentTab === 'favorites'"
        @favorite="handleFavorite"
      />
    </div>

    <v-snackbar
      v-model="notificationSnackbar.show"
      :color="notificationSnackbar.color"
    >
      {{ notificationSnackbar.message }}
    </v-snackbar>
  </div>

  <div v-else class="profile-page page-width">
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
.profile-page {
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
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .profile-page {
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
  .profile-page {
    max-width: 1400px;
  }
}
</style>
