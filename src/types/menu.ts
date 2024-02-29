export type Menu = {
  [key: number]: MenuGroup
}

export type MenuGroup = {
  id: number
  groupTitle: string
  items: MenuItem[]
}

export type MenuItem = {
  id: number
  title: string
  icon: string
  link: string
}

export type MenuStoreState = {
  activeMenuItem: string
  isSidebarOpen: boolean
}

export type MenuStoreGetters = {
  getActiveMenuItem: (state: MenuStoreState) => string
  getIsSidebarOpen: (state: MenuStoreState) => boolean
}

export type MenuStoreActions = {
  setActiveMenuItem: (item: string) => void
  setIsSidebarOpen: (value: boolean) => void
}
