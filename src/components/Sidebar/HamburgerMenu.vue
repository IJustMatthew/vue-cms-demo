<template>
  <div class="hamburger-wrapper">
    <input
      id="toggle_sidebar"
      type="checkbox"
      @click="emits('clicked')"
      :checked="isChecked" />

    <label for="toggle_sidebar" class="hamburger">
      <div class="top"></div>
      <div class="center"></div>
      <div class="bottom"></div>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isChecked: boolean
}>()
const emits = defineEmits(['clicked'])
</script>

<style lang="scss" scoped>
.hamburger-wrapper {
  position: relative;
  display: flex;
}
.hamburger {
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 10px;

  div {
    position: relative;
    width: 30px;
    height: 3px;
    border-radius: 3px;
    margin-bottom: 5px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  div:nth-child(1) {
    background-color: $theme1;
  }
  div:nth-child(2) {
    background-color: $theme2;
  }
  div:nth-child(3) {
    background-color: $theme3;
    margin-bottom: 0;
  }
}

#toggle_sidebar {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
}

#toggle_sidebar:checked + .hamburger .top {
  transform: rotate(-45deg);
  margin-top: 10px;
}
#toggle_sidebar:checked + .hamburger .bottom {
  opacity: 0;
  transform: rotate(45deg);
}
#toggle_sidebar:checked + .hamburger .center {
  transform: rotate(45deg);
  margin-top: -7px;
}
</style>
