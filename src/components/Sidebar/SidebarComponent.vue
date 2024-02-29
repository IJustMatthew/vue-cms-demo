<template>
  <div class="sidebar__drawer" v-if="isOpen" @click="toggleSidebar"></div>
  <div
    class="sidebar"
    :class="[isOpen && 'sidebar-open']"
    @scroll="navigateToMenuItem(getActiveMenuItem)">
    <div class="sidebar__inner__wrapper">
      <div class="sidebar__header">
        <img src="/img/logo.svg" alt="" />
      </div>
      <div class="sidebar__content">
        <SidebarMenu />
      </div>
    </div>

    <div class="sidebar__footer">
      <SidebarUser />
    </div>
  </div>

  <div class="sidebar__resp-button" :class="isOpen && 'sidebar-hamburger-open'">
    <HamburgerMenu @clicked="toggleSidebar" :is-checked="isOpen" />
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from '@/components/Sidebar/SidebarMenu.vue'
import SidebarUser from '@/components/Sidebar/SidebarUser.vue'
import { navigateToMenuItem } from '@/composables/global'
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import HamburgerMenu from './HamburgerMenu.vue'

const store = useMenuStore()
const { getIsSidebarOpen: isSidebarOpen, getActiveMenuItem } =
  storeToRefs(store)

let isOpen = computed(() => {
  return isSidebarOpen.value
})

const toggleSidebar = (): void => {
  store.setIsSidebarOpen(!isSidebarOpen.value)
}
</script>

<style lang="scss" scoped>
.sidebar__drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
.sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100vh;
  overflow-y: scroll;
  width: $sidebar-width;
  padding: $padding-md;
  background: $primary;
  z-index: 100;
  transition: left 0.3s;

  &-open {
    left: 0 !important;
  }

  &-hamburger-open {
    left: calc($sidebar-width + $padding-sm) !important;
  }

  @include until-tablet {
    position: fixed;
    left: -$sidebar-width;
    top: 0;
  }

  &__inner__wrapper {
    display: flex;
    flex-flow: column wrap;
  }

  &__header {
    display: flex;
    justify-content: center;

    img {
      width: 120px;
      height: 90px;
      object-fit: contain;
    }
  }

  &__content {
    margin-top: 40px;
    margin-bottom: auto;
  }

  &__footer {
    display: flex;
    justify-content: center;
    margin-bottom: $padding-xs;
  }

  &__resp-button {
    display: none;
    position: fixed;
    top: 20px;
    left: $padding-sm;
    background: $light;
    color: $light;
    border-radius: 5px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    transition: left 0.3s;
    z-index: 100;

    @include until-tablet {
      display: block;
    }
  }
}

// Scrollbar styles
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: $cancel;
  border-radius: 10px;
}
</style>
