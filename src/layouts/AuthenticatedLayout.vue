<template>
  <div class="auth__layout">
    <!-- SidebarComponent -->
    <div class="auth__layout__sidebar">
      <div class="triangle" id="active_menu_arrow"></div>
      <SidebarComponent />
    </div>

    <!-- Content -->
    <div class="auth__layout__wrapper">
      <div class="auth__layout__wrapper-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/Sidebar/SidebarComponent.vue'
</script>

<style lang="scss" scoped>
.auth__layout {
  display: grid;
  grid-template-columns: $sidebar-width 1fr;
  min-height: 100vh;

  @include until-tablet {
    grid-template-columns: 1fr;
  }

  &__sidebar {
    position: relative;

    .triangle {
      position: fixed;
      display: block;
      height: 0px;
      width: 0px;
      top: 25%;
      left: calc($sidebar-width - 12px);
      border-right: solid 12px $light;
      border-bottom: solid 12px transparent;
      border-top: solid 12px transparent;
      transition: top 0.3s;
      z-index: 120;

      @include until-tablet {
        display: none;
      }
    }
  }

  &__wrapper {
    position: relative;
    background: $primary;

    &-content {
      position: relative;
      min-height: 100vh;
      height: 100%;
      width: 100%;
      padding: $padding-lg $padding-xl;
      background: $light;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;

      @include until-tablet {
        border-radius: 0;
        padding: $padding-xl $padding-sm $padding-md $padding-sm;
      }
    }
  }
}
</style>
