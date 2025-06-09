<script lang="ts" setup>
const props = withDefaults(defineProps<{ endDate?: Date }>(), {
  endDate: () => new Date(),
});

const countdownVariables = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});
let countdown: NodeJS.Timeout;

onMounted(() => {
  updateCountdown();

  // Set interval to update countdown every second
  countdown = setInterval(updateCountdown, 1000);
});

function updateCountdown() {
  const now = new Date().getTime();
  const distance = props.endDate.getTime() - now;

  // Check if the countdown is finished
  if (distance < 0) {
    clearInterval(countdown);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownVariables.value.days = days;
  countdownVariables.value.hours = hours;
  countdownVariables.value.minutes = minutes;
  countdownVariables.value.seconds = seconds;
}
</script>

<template>
  <div class="countdown-row">
    <div class="countdown-block">
      <span class="countdown-block__number">{{ countdownVariables.days }}</span>
      <span class="countdown-block__type">Days</span>
    </div>
    <div class="countdown-block">
      <span class="countdown-block__number">
        {{ countdownVariables.hours }}
      </span>
      <span class="countdown-block__type">Hours</span>
    </div>
    <div class="countdown-block">
      <span class="countdown-block__number">
        {{ countdownVariables.minutes }}
      </span>
      <span class="countdown-block__type">Mins</span>
    </div>
    <div class="countdown-block">
      <span class="countdown-block__number">
        {{ countdownVariables.seconds }}
      </span>
      <span class="countdown-block__type">Secs</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.countdown-row {
  display: flex;
  gap: 10px;
}

.countdown-block {
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 16px;

  &__number {
    font-family: 'Trebuchet MS', sans-serif;
    font-weight: bold;
    font-size: 22px;
  }

  &__type {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 14px;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .countdown-row {
    gap: 16px;
  }

  .countdown-block {
    width: 70px;
    height: 70px;

    &__number {
      font-size: 24px;
    }

    &__type {
      font-size: 14px;
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .countdown-row {
    gap: 20px;
  }

  .countdown-block {
    width: 80px;
    height: 80px;

    &__number {
      font-size: 32px;
    }

    &__type {
      font-size: 16px;
    }
  }
}
</style>
