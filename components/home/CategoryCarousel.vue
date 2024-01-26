<script lang="ts" setup>
import { fakeDatabase } from '~/utils/fakeDatabase';

const carousel = ref(null);
</script>

<template>
  <div class="category-carousel">
    <div class="category-carousel__title">Shop by Categories</div>

    <v-sheet class="mx-auto" max-width="1400">
      <v-slide-group v-model="carousel" show-arrows>
        <v-slide-group-item
          v-for="category in fakeDatabase.categories"
          :key="category.id"
        >
          <v-card
            :href="'/shop?category=' + category.slug"
            class="category-card"
            elevation="0"
          >
            <v-img
              :src="category.image"
              alt="Category Image"
              class="category-card__image"
            ></v-img>
            <div class="category-card__name-background-container">
              <v-card-title class="category-card__name-background">
                {{ category.name }}
              </v-card-title>
            </div>
            <div class="category-card__name-container">
              <v-card-title class="category-card__name">
                {{ category.name }}
              </v-card-title>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.category-carousel {
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.category-card {
  position: relative;
  min-width: 200px;
  padding: 12px;
  transition: 0.3s;

  &:hover {
    transform: scale(1.02);
  }

  &__image {
    border-radius: 4px;
  }

  &__name-background-container {
    position: absolute;
    top: 0;
    right: 12px;
    width: 160px;
  }

  &__name-background {
    text-overflow: clip;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 72px;
    font-weight: bold;
    line-height: normal !important;
    color: white;
    opacity: 0.2;
    user-select: none;
  }

  &__name-container {
    position: absolute;
    bottom: 20px;
    left: 35px;
    width: 130px;
    margin: 12px 0;
    background: white;
    border-radius: 8px;
  }

  &__name {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 16px;
    text-align: center;
    user-select: none;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .category-carousel {
    &__title {
      font-size: 28px;
      margin-bottom: 16px;
    }
  }

  .category-card {
    min-width: 220px;
    padding: 16px;

    &__name-background-container {
      width: 180px;
      top: 5px;
    }

    &__name-background {
      font-size: 76px;
    }

    &__name-container {
      width: 150px;
    }

    &__name {
      font-size: 20px;
      text-align: center;
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .category-carousel {
    &__title {
      font-size: 32px;
      margin-bottom: 20px;
    }
  }

  .category-card {
    min-width: 250px;
    padding: 20px;

    &__name-background-container {
      width: 200px;
      top: 5px;
    }

    &__name-background {
      font-size: 84px;
    }

    &__name-container {
      width: 180px;
    }

    &__name {
      font-size: 24px;
      text-align: center;
    }
  }
}
</style>
