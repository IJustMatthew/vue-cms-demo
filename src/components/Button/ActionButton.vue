<template>
  <button @click="handleClick">
    <img :src="icon" alt="" />
  </button>
</template>

<script setup lang="ts">
type Props = {
  icon: string
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

  height: 45px;
  width: 45px;

  padding: $padding-xs;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  outline: none;

  transition: all 0.3s ease;

  &:hover {
    background: $secondary;

    img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%)
        hue-rotate(111deg) brightness(105%) contrast(101%);
    }
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    transition: all 0.3s ease;
  }
}
</style>
