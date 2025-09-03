<script lang="ts" setup>
import type { UserDto } from '~/models/dto/userDto';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();

const emit = defineEmits(['save']);

const user = computed(() => userStore.user);

const editedUser = ref<Partial<UserDto>>({
  id: user.value?.id ?? '',
  firstName: user.value?.firstName ?? '',
  lastName: user.value?.lastName ?? '',
  email: user.value?.email ?? '',
});
const errors = ref({
  firstName: '',
  lastName: '',
});
const saveLoading = ref(false);

onMounted(() => {
  editedUser.value = { ...user.value };
});

async function saveGeneral() {
  errors.value.firstName = '';
  errors.value.lastName = '';

  let valid = true;

  if (!editedUser.value.firstName?.trim()) {
    errors.value.firstName = 'First name is required';
    valid = false;
  }
  if (!editedUser.value.lastName?.trim()) {
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
    firstName: editedUser.value.firstName ?? '',
    lastName: editedUser.value.lastName ?? '',
  });

  emit('save');

  saveLoading.value = false;
}
</script>

<template>
  <div class="profile-page__section">
    <h2 class="profile-page__section-title">General Information</h2>
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
</template>

<style lang="scss" scoped></style>
