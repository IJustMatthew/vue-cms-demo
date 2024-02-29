<template>
  <div>
    <MenuGroup
      v-for="menuData in menu"
      :key="menuData.id"
      :menuData="menuData" />
  </div>
</template>

<script setup lang="ts">
import { menu } from '@/assets/mock/menu'
import MenuGroup from '@/components/Sidebar/SidebarMenuGroup.vue'
import { Menu } from '@/types/menu'
import { Ref, ref } from 'vue'

const menuData: Ref<Menu> = ref(menu)
</script>
