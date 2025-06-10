<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    min?: number;
    max?: number;
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: Infinity,
  },
);

const emit = defineEmits([
  'update:modelValue',
  'change',
  'increase',
  'decrease',
]);

const animate = ref(false);

const quantity = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

watch(quantity, () => {
  animate.value = true;
  setTimeout(() => (animate.value = false), 150);
});

function decrease() {
  if (quantity.value <= props.min) {
    return;
  }

  quantity.value--;

  emit('decrease');
  emit('change');
}

function increase() {
  if (quantity.value >= props.max) {
    return;
  }

  quantity.value++;

  emit('increase');
  emit('change');
}
</script>

<template>
  <div class="quantity-box">
    <button :disabled="quantity <= min" class="quantity-btn" @click="decrease">
      −
    </button>
    <span :class="{ animate }" class="quantity-value">{{ quantity }}</span>
    <button :disabled="quantity >= max" class="quantity-btn" @click="increase">
      +
    </button>
  </div>
</template>

<style lang="scss" scoped>
.quantity-box {
  display: flex;
  align-items: center;
  border: 1px solid black;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  width: fit-content;
  padding: 0;
  height: 44px;
  user-select: none;
}

.quantity-btn {
  all: unset;
  padding: 0 14px;
  cursor: pointer;
  font-size: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.quantity-value {
  width: 32px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  transition: transform 0.15s ease;

  &.animate {
    transform: scale(1.2);
  }
}
</style>
