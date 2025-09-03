<script lang="ts" setup>
import type { UserDto } from '~/models/dto/userDto';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();

const emit = defineEmits(['save']);

const user = computed(() => userStore.user);

const editedUser = ref<Partial<UserDto>>({
  address: {
    street: user.value?.address?.street ?? '',
    city: user.value?.address?.city ?? '',
    zip: user.value?.address?.zip ?? '',
  },
});
const errors = ref({
  street: '',
  city: '',
  zip: '',
});
const saveLoading = ref(false);

onMounted(() => {
  editedUser.value = { ...user.value };
});

async function saveAddress() {
  errors.value.street = '';
  errors.value.city = '';
  errors.value.zip = '';

  let valid = true;

  if (!editedUser.value.address?.street?.trim()) {
    errors.value.street = 'Street is required';
    valid = false;
  }
  if (!editedUser.value.address?.city?.trim()) {
    errors.value.city = 'City is required';
    valid = false;
  }
  if (!editedUser.value.address?.zip?.trim()) {
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

  emit('save');

  saveLoading.value = false;
}
</script>

<template>
  <div class="profile-page__section">
    <h2 class="profile-page__section-title">Shipping Address</h2>
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
</template>

<style lang="scss" scoped></style>
