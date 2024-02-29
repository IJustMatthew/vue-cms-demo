<template>
  <div class="user">
    <div class="user__monogram" :class="type">{{ props.monogram }}</div>
    <div class="user__info">
      <div class="user__info__name">{{ props.name }}</div>
      <div class="user__info__email">{{ props.email }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  name: string
  email: string
  type: 'blue' | 'green' | 'red'
  monogram: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  gap: $padding-xs;

  @include until-smallphone {
    flex-flow: column wrap;
    padding: $padding-sm;
  }

  &__monogram {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    border-radius: 50%;

    text-align: center;
    font-size: $font-lg;
    font-weight: 500;
    color: $light;
  }

  &__info {
    display: flex;
    flex-flow: column wrap;

    &__name {
      font-size: $font-lg;
      font-weight: 500;
    }

    &__email {
      font-size: $font-sm;
      font-weight: 300;
      opacity: 0.6;
    }
  }

  .blue {
    background: $theme1;
  }

  .red {
    background: $theme2;
  }

  .green {
    background: $theme3;
  }
}
</style>
