<script lang="ts" setup>
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();

onMounted(() => {
  checkUser();
});

function checkUser() {
  const userFromLocalStorage = localStorage.getItem('user');
  if (userFromLocalStorage) {
    userStore.setUser(JSON.parse(userFromLocalStorage));
  }
}
</script>

<template>
  <div>
    <Head>
      <Title>GreenElegance Boutique</Title>
      <Meta content="GreenElegance Boutique" name="description" />
      <Meta content="width=device-width, initial-scale=1" name="viewport" />
    </Head>
    <Body class="grid">
      <NuxtLayout>
        <v-app>
          <NuxtPage />
        </v-app>
      </NuxtLayout>
    </Body>
  </div>
</template>
