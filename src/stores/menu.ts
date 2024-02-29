import { getStorageItem, setStorageItem } from '@/composables/local-storage'
import {
  MenuStoreActions,
  MenuStoreGetters,
  MenuStoreState,
} from '@/types/menu'
import { defineStore } from 'pinia'

// Get Menu options from Mock
const activeMenuItem = getStorageItem<string>('activeMenuItem') ?? 'Inbox'

export const useMenuStore = defineStore<
  'menu',
  MenuStoreState,
  MenuStoreGetters,
  MenuStoreActions
>('menu', {
  state: (): MenuStoreState => ({
    activeMenuItem: activeMenuItem,
    isSidebarOpen: false,
  }),
  getters: {
    getActiveMenuItem: (state) => state.activeMenuItem,
    getIsSidebarOpen: (state) => state.isSidebarOpen,
  },
  actions: {
    setActiveMenuItem(item: string) {
      this.activeMenuItem = item
      setStorageItem('activeMenuItem', item)
    },
    setIsSidebarOpen(value: boolean) {
      this.isSidebarOpen = value
    },
  },
})
