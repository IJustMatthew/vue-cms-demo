<template>
  <div class="menu__group">
    <p class="menu__group-title">{{ menuData.groupTitle }}</p>
    <ul>
      <li
        v-for="menuItem in menuData.items"
        :key="menuItem.id"
        :id="menuItem.title"
        class="menu__group-item"
        :class="menuItem?.title === getActiveMenuItem && 'active-group'">
        <img :src="menuItem.icon" alt="" />
        <router-link
          :to="menuItem.link"
          @click="handleMenuClick(menuItem.title)">
          {{ menuItem.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { MenuGroup } from '@/types/menu'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { navigateToMenuItem } from '@/composables/global'

type Props = {
  menuData: MenuGroup
}

const props = defineProps<Props>()
const store = useMenuStore()
const { getActiveMenuItem } = storeToRefs(store)

// Set the active menu item in the store and trigger triangle position change
const handleMenuClick = (item): void => {
  navigateToMenuItem(item)
  store.setActiveMenuItem(item)
  store.setIsSidebarOpen(false)
}

// Set the triangle position on page refresh
onMounted(() => {
  navigateToMenuItem(getActiveMenuItem.value)
})
</script>

<style lang="scss" scoped>
.menu__group {
  margin-bottom: 35px;

  &-title {
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  &-item {
    display: flex;
    align-items: center;
    padding: 7px 0;
    border-radius: 5px;
    transition: background-color 0.3s;

    &-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    img {
      margin-right: 10px;
      width: 20px;
      height: 20px;
      object-fit: contain;
      color: inherit;
    }

    a {
      color: $inactive;
      font-size: 15px;
      text-decoration: none;
      transition: color 0.3s;
    }

    &:hover {
      & img {
        filter: brightness(0) saturate(100%) invert(15%) sepia(91%)
          saturate(4207%) hue-rotate(250deg) brightness(79%) contrast(108%);
      }
      & a {
        color: $secondary;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }

  &-item a:hover,
  a.active,
  a.active {
    color: $secondary;
    font-weight: 700;
    cursor: pointer;
  }

  .active-group {
    img {
      filter: brightness(0) saturate(100%) invert(15%) sepia(91%)
        saturate(4207%) hue-rotate(250deg) brightness(79%) contrast(108%);
    }
  }
}
</style>
