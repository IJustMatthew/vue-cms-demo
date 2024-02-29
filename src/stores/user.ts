import { users } from '@/assets/mock/users'
import {
  convertUser,
  createPaginatedUsers,
  getMonogramFromName,
  selectAllUserCheckbox,
} from '@/composables/global'
import {
  ModifiedUser,
  SortByTypes,
  User,
  UserFormProps,
  UserStoreActions,
  UserStoreGetters,
  UserStoreState,
} from '@/types/user'
import { defineStore } from 'pinia'

// Get users from Mock and convert them to the format we need
const convertedUsers = users.map((user) => {
  return convertUser(user, 'edit', 0)
})

export const useUserStore = defineStore<
  'user',
  UserStoreState,
  UserStoreGetters,
  UserStoreActions
>('user', {
  state: (): UserStoreState => ({
    users: convertedUsers ?? [],
    selectedItems: [],
    selectAllActive: false,
    editMode: false,
    editedUserId: null,
    deleteUserId: null,
    userAdditionInProgress: false,
    isSelectionActive: false,
    sortBy: 'id',
    sortType: 'desc',
    currentPage: 1,
    perPage: 6,
  }),
  getters: {
    getUsers: (state) => createPaginatedUsers(state.users, state.perPage),
    getUsersLength: (state) => state.users.length,
    getUserToDelete: (state) =>
      state.users.find((user) => user.id === state.deleteUserId),
    getEditMode: (state) => state.editMode,
    getIsUserAdditionActive: (state) => state.userAdditionInProgress,
    getSelectAllActive: (state) => state.selectAllActive,
    getIsSelectionActive: (state) => {
      if (state.selectedItems.length > 0 || state.selectAllActive) {
        return true
      } else {
        return false
      }
    },
    getSelectedItems: (state) => state.selectedItems,
    getCurrentPage: (state) => state.currentPage,
  },
  actions: {
    // Add user to state.users
    addUser(user: User) {
      let currentIndex = this.getUsersLength
      let convertedUser = convertUser(user, 'add', currentIndex)
      this.users.push(convertedUser as ModifiedUser)
    },
    // Edit and update specific user
    editUser(userData: UserFormProps) {
      let editUserIndex = this.users.findIndex(
        (user) => user.id === userData.id
      )

      let editedUser = this.users.find((user) => user.id === userData.id)
      let updatedUser = {
        ...editedUser,
        name: userData.name,
        email: userData.email,
        monogram: getMonogramFromName(userData.name),
      }
      this.users[editUserIndex] = updatedUser as ModifiedUser
    },
    // Change edit mode
    setEditMode(value: boolean) {
      this.editMode = value

      if (!this.editMode) {
        this.editedUserId = null
      }
    },
    // Change user addition status
    setUserAdditionInProgress(value: boolean) {
      this.userAdditionInProgress = value
    },
    // Add or remove user ID-s => state.selectedItems
    updateSelectedItems(id: number) {
      // If the user is already in the selectedItems array, remove it, otherwise add it
      if (this.selectedItems.includes(id)) {
        this.selectedItems = this.selectedItems.filter(
          (userId) => id !== userId
        )
      } else {
        this.selectedItems.push(id)
      }

      // Update the selection status of the sepcific user
      this.users = this.users.map((user) => {
        if (user.id === id) {
          user.isSelected = !user.isSelected
        }
        return user
      })
      this.selectAllActive = false
    },
    // Select or deselect all users on the current page - checkbox & state.selectedItems
    selectAllUsers() {
      if (this.selectAllActive) {
        this.selectedItems = this.getUsers[this.currentPage - 1].map(
          (user) => user.id
        )
      } else {
        this.selectedItems = []
      }

      // Update the selection status of the users on the current page
      const updatedUsers = selectAllUserCheckbox(
        this.getUsers[this.currentPage - 1],
        this.selectAllActive
      )

      this.users = this.users.map((user) => {
        let updatedUser = updatedUsers.find((u) => u.id === user.id)
        if (updatedUser) {
          return updatedUser
        }
        return user
      })
    },
    // A boolean to check if all users are selected
    setSelectAllActive(value: boolean) {
      this.selectAllActive = value
    },
    // Set the user ID to be edited
    setEditedUserId(id: number | null) {
      this.editedUserId = null
      this.editedUserId = id
    },
    // Set the user ID to be deleted
    setDeleteUserId(id: number | null) {
      this.deleteUserId = id
    },
    // Remove user from state.users
    deleteUser(id: number) {
      let usersLengthBeforeDelete = this.getUsers.length
      this.users = this.users.filter((user) => user.id !== id)
      let usersLengthAfterDelete = this.getUsers.length

      // If the last user is deleted, go back to the previous page, except if it's the first page
      if (usersLengthAfterDelete < usersLengthBeforeDelete) {
        if (this.currentPage !== 1) {
          this.currentPage = this.currentPage - 1
        }
      }

      // If there's only one page left, force first page as current page
      if (this.users.length <= this.perPage) {
        this.currentPage = 1
      }

      this.selectedItems = this.selectedItems.filter((item) => item !== id)
      this.editMode = false
    },
    // Remove multiple users from state.users
    deleteMultipleUsers() {
      let usersLengthBeforeDelete = this.getUsers.length
      this.users = this.users.filter(
        (user) => !this.selectedItems.includes(user.id)
      )
      let usersLengthAfterDelete = this.getUsers.length

      // If the last user is deleted, go back to the previous page, except if it's the first page
      if (usersLengthAfterDelete < usersLengthBeforeDelete) {
        if (this.currentPage !== 1) {
          this.currentPage = this.currentPage - 1
        }
      }

      // If there's only one page left, force first page as current page
      if (this.users.length <= this.perPage) {
        this.currentPage = 1
      }

      this.selectedItems = []
      this.selectAllActive = false
      this.editMode = false
    },
    setCurrentPage(page: number) {
      this.currentPage = page
    },
    // Sort users by ID, Name or Permission
    setSortBy(type: SortByTypes) {
      this.sortBy = type
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc'

      this.users = this.users.sort((a, b) => {
        if (this.sortType === 'asc') {
          return (a[type] as string).toLowerCase() >
            (b[type] as string).toLowerCase()
            ? 1
            : -1
        } else {
          return (a[type] as string).toLowerCase() <
            (b[type] as string).toLowerCase()
            ? 1
            : -1
        }
      })
    },
  },
})
