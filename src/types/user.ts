export type User = {
  id: number
  name: string
  email: string
  permission: 'admin' | 'agent' | 'user'
}

export type ModifiedUser = User & {
  monogram: string
  bgType: 'blue' | 'green' | 'red'
  isSelected: boolean
}

export type SortByTypes = 'id' | 'name' | 'permission'

export type UserStoreState = {
  users: ModifiedUser[]
  selectedItems: number[]
  selectAllActive: boolean
  editMode: boolean
  editedUserId: null | number
  deleteUserId: null | number
  userAdditionInProgress: boolean
  isSelectionActive: boolean
  sortBy: SortByTypes
  sortType: 'asc' | 'desc'
  currentPage: number
  perPage: number
}

export type UserStoreGetters = {
  getUsers: (state: UserStoreState) => ModifiedUser[][]
  getUsersLength: (state: UserStoreState) => number
  getUserToDelete: (state: UserStoreState) => ModifiedUser | undefined
  getEditMode: (state: UserStoreState) => boolean
  getIsUserAdditionActive: (state: UserStoreState) => boolean
  getSelectAllActive: (state: UserStoreState) => boolean
  getIsSelectionActive: (state: UserStoreState) => boolean
  getSelectedItems: (state: UserStoreState) => number[]
  getCurrentPage: (state: UserStoreState) => number
}

export type UserStoreActions = {
  addUser: (user: User) => void
  editUser: (userData: UserFormProps) => void
  setEditMode: (value: boolean) => void
  setUserAdditionInProgress: (value: boolean) => void
  updateSelectedItems: (item: number) => void
  selectAllUsers: () => void
  setSelectAllActive: (value: boolean) => void
  setEditedUserId: (id: number | null) => void
  setDeleteUserId: (id: number | null) => void
  deleteUser: (id: number) => void
  deleteMultipleUsers: () => void
  setCurrentPage: (page: number) => void
  setSortBy: (value: SortByTypes) => void
}

export type UserFormProps = {
  id?: number
  name: string
  email: string
  permission: string
}
