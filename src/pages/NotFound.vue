<template>
  <XyzTransition appear xyz="fade flip-left perspective-1">
    <div class="notfound">
      <h1>404 - Page Not Found</h1>
      <ButtonComponent type="secondary" text="Home" @clicked="goHome" />
    </div>
  </XyzTransition>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import { RoutePaths } from '@/router/routes'
import { useMenuStore } from '@/stores/menu'
import { useMeta } from 'vue-meta'
import { useRouter } from 'vue-router'
const store = useMenuStore()

const router = useRouter()
// Init page's META info
const content = useMeta({
  title: 'Not Found | 404 | CMS demo',
})

const goHome = (): void => {
  store.setActiveMenuItem('Inbox')
  router.push(RoutePaths.Inbox)
}
</script>

<style lang="scss" scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100vh;
  overflow: hidden;

  h1 {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
