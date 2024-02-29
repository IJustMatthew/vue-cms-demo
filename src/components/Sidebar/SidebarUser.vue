<template>
  <div class="user">
    <div class="user__image__wrapper">
      <img src="/img/user.jpg" alt="" />
    </div>
    <span class="user__available"></span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.user {
  position: relative;
  display: inline-block;

  &__image__wrapper {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid $light;
    overflow: hidden;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__available {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: $theme3;
    border: 2px solid $light;
  }
}
</style>
