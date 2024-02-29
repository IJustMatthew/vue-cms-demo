<template>
  <button
    :class="type"
    :style="{ 'min-width': minWidth + 'px' }"
    @click="handleClick"
    :disabled="isDisabled">
    <img :src="icon" v-if="icon" />
    {{ text }}
  </button>
</template>

<script setup lang="ts">
type Props = {
  text: string
  type: string
  isDisabled?: boolean
  icon?: string
  minWidth?: number
}

const props = defineProps<Props>()
const emits = defineEmits(['clicked'])

const handleClick = (): void => {
  emits('clicked')
}
</script>

<style lang="scss" scoped>
button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;

  padding: $padding-xs $padding-sm;
  border: none;
  border-radius: 8px;
  outline: none;

  img {
    width: 20px;
    height: 20px;
  }
}

.secondary {
  color: $light;
  background: $secondary;
  border: 1px solid $secondary;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.3);
  }

  &:disabled {
    background: $inactive;
    border: 1px solid $inactive;

    &:hover {
      filter: none;
    }
  }
}

.cancel {
  color: $inactive;
  background: $cancel;
  border: 1px solid $primary;
  font-weight: 500;
  transition: filter 0.3s;

  &:hover {
    border: 1px solid $inactive;
    filter: brightness(1.1);
  }
}
</style>
