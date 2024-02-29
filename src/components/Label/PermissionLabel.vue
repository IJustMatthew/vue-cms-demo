<template>
  <div class="label" :class="`label__${type}`">
    {{ type }}
  </div>
</template>

<script setup lang="ts">
type Props = {
  type: 'admin' | 'agent' | 'user'
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.label {
  display: inline-block;
  text-align: center;
  text-transform: capitalize;

  min-width: 80px;
  padding: 7px 15px;

  border-radius: 10px;
  color: $label-text;
  font-weight: 500;
  font-size: $font-sm;

  &__admin {
    background: $label1;
  }

  &__agent {
    background: $label2;
  }

  &__user {
    background: $label3;
  }
}
</style>
