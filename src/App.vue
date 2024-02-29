<template>
  <AppLayout>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
</script>
