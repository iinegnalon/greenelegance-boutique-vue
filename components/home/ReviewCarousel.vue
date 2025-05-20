<script lang="ts" setup>
import { fakeDatabase } from '~/utils/fakeDatabase';

const carousel = ref(null);
</script>

<template>
  <section class="review-carousel page-width">
    <h2 class="review-carousel__title">What Our Customers Say</h2>

    <v-sheet class="sheet mx-auto" max-width="1800">
      <v-slide-group v-model="carousel" show-arrows>
        <v-slide-group-item
          v-for="review in fakeDatabase.reviews"
          :key="review.id"
        >
          <div class="review-card-wrapper">
            <v-card class="review-card" elevation="0">
              <v-card-item>
                <v-rating
                  :length="5"
                  :model-value="review.rating"
                  :size="28"
                  active-color="#FFD700"
                  color="#FFD700"
                  half-increments
                  hover
                  readonly
                />
              </v-card-item>
              <v-card-text class="review-card__text">
                {{ review.text }}
              </v-card-text>
              <v-card-item class="reviewer-info">
                <v-row class="reviewer-info__row">
                  <v-col class="reviewer-info__avatar-col">
                    <v-avatar class="reviewer-info__avatar">
                      <v-img
                        :alt="review.name"
                        :src="review.image"
                        cover
                      ></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col class="reviewer-info__text-col">
                    <h3 class="reviewer-info__name ellipsis">
                      {{ review.name }}
                    </h3>
                    <p class="reviewer-info__position ellipsis">
                      {{ review.position }}
                    </p>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/assets/css/variables.scss';

// Mobile
.review-carousel {
  background: #f0f0f0;
  padding-top: 10px;
  padding-bottom: 10px;

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
  }
}

.sheet {
  background: #f0f0f0;
}

.review-card-wrapper {
  padding: 6px;
  width: calc(90vw - 104px);
}

.review-card {
  position: relative;
  transition: 0.3s;

  &__text {
    font-size: 14px;
    height: 150px;
  }
}

.reviewer-info {
  &__row {
    flex-wrap: nowrap;
    align-items: center;
  }

  &__avatar-col {
    flex-grow: 0;
  }

  &__avatar {
    width: 40px;
    height: 40px;
  }

  &__name {
    font-size: 16px;
  }

  &__position {
    font-size: 12px;
    margin: 0;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .review-carousel {
    padding-top: 16px;
    padding-bottom: 16px;

    &__title {
      font-size: 28px;
      margin-bottom: 16px;
    }
  }

  .review-card-wrapper {
    padding: 8px;
  }

  .review-card {
    &__text {
      font-size: 16px;
      height: 80px;
    }
  }

  .reviewer-info {
    &__avatar {
      width: 52px;
      height: 52px;
    }

    &__name {
      font-size: 18px;
    }

    &__position {
      font-size: 14px;
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .review-carousel {
    padding-top: 20px;
    padding-bottom: 20px;

    &__title {
      font-size: 32px;
      margin-bottom: 20px;
    }
  }

  .review-card-wrapper {
    padding: 10px;
    width: calc((90vw - 104px) / 2);
    max-width: 700px;
  }

  .review-card {
    &__text {
      font-size: 18px;
      height: 120px;
    }
  }

  .reviewer-info {
    &__avatar {
      width: 60px;
      height: 60px;
    }

    &__name {
      font-size: 20px;
    }

    &__position {
      font-size: 16px;
    }
  }
}
</style>
