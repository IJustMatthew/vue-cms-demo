<template>
  <XyzTransition appear class="" xyz="fade front">
    <div class="outbound">
      <h1>OutBound page</h1>
    </div>
  </XyzTransition>
</template>

<script setup lang="ts">
import { useMeta } from 'vue-meta'

// Init page's META info
const content = useMeta({
  title: 'Outbound | CMS demo',
})
</script>

<style lang="scss" scoped>
.outbound {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  height: calc(100vh - $padding-lg * 2);
  overflow: hidden;

  h1 {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
