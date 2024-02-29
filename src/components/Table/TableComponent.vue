<template>
  <!-- Delete user popup -->
  <DeleteModal
    :isOpen="isModalOpen"
    @modal-close="handleCloseDeleteModal"
    @modal-confirm="onDeleteModalConfirm">
    <template #content>
      <p>
        Do you want to Delete <b>{{ userToDelete?.name }}</b> from the list?
      </p>
    </template>
    <template #footer></template>
  </DeleteModal>

  <!-- Table component -->
  <div class="table">
    <!-- Table Header -->
    <div class="table-header" :key="selectAllActive.toString()">
      <CheckboxInput
        id="select_all"
        :selected="selectAllActive"
        @clicked="handleSelectAllUsers" />
      <p
        class="user-text"
        :class="userStore.sortBy === 'name' && 'active-sort'"
        @click="handleSortBy('name')">
        Users
        <span v-if="userStore.sortBy === 'name'">{{
          userStore.sortType === 'asc' ? '▼' : '▲'
        }}</span>
      </p>
      <p class="select-text">Select all</p>
      <p
        class="permission-text"
        :class="userStore.sortBy === 'permission' && 'active-sort'"
        @click="handleSortBy('permission')">
        Permission
        <span v-if="userStore.sortBy === 'permission'">{{
          userStore.sortType === 'asc' ? '▼' : '▲'
        }}</span>
      </p>
    </div>

    <!-- Table Body -->
    <div class="table-body" :key="tableUpdateKey">
      <div
        class="table-body__row"
        v-for="user in paginatedUsers"
        :key="user.id"
        @mouseover="handleItemOnHover(user.id)"
        @mouseleave="handleItemOnLeave">
        <div class="table-body__row__wrapper">
          <!-- Checkobx -->
          <div class="table-body__row__checkbox">
            <CheckboxInput
              :id="user.email"
              :selected="user.isSelected"
              @clicked="handleAddToSelected(user.id)" />
          </div>

          <!-- User thumbnail & info -->
          <div class="table-body__row__info">
            <UserInfo
              :name="user.name"
              :email="user.email"
              :monogram="user.monogram"
              :type="user.bgType" />
          </div>

          <!-- Permission level -->
          <div class="table-body__row__labels">
            <PermissionLabel :type="user.permission" />
          </div>

          <!-- Actions - edit/delete -->
          <!-- Desktop actions -->
          <Transition name="fade">
            <div
              v-show="hoverIndex === user.id"
              class="table-body__row__actions desktop-actions">
              <ActionButton
                icon="/img/icons/edit.svg"
                @clicked="handleEditUser(user.id)" />
              <ActionButton
                icon="/img/icons/delete.svg"
                @clicked="handleDeleteUserBtnClick(user.id)" />
            </div>
          </Transition>

          <!-- Mobile actions -->
          <div class="table-body__row__actions phone-actions">
            <ActionButton
              icon="/img/icons/edit.svg"
              @clicked="handleEditUser(user.id)" />
            <ActionButton
              icon="/img/icons/delete.svg"
              @clicked="handleDeleteUserBtnClick(user.id)" />
          </div>
        </div>
        <div v-if="userStore.editedUserId === user.id" class="table-body__form">
          <UserForm
            :id="user.id"
            :name="user.name"
            :email="user.email"
            :permission="user.permission"
            @submit="handleEditUserSubmit"
            @cancel="handleEditUserCancel" />
        </div>
      </div>
    </div>

    <!-- Table footer -->
    <div v-if="usersLength > 6" class="table-footer">
      <vue-awesome-paginate
        :total-items="usersLength"
        :items-per-page="6"
        :max-pages-shown="100"
        v-model="currentPage"
        :on-click="handlePaginate">
        <template #prev-button>
          <span>
            <img
              src="/img/icons/arrow-left.svg"
              class="nav-arrow"
              :class="currentPage === 1 && 'arrow-disabled'" />
          </span>
        </template>
        <template #next-button>
          <span>
            <img
              src="/img/icons/arrow-right.svg"
              class="nav-arrow"
              :class="
                currentPage === paginatedUsersFromStore.length &&
                'arrow-disabled'
              " />
          </span>
        </template>
      </vue-awesome-paginate>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/Button/ActionButton.vue'
import CheckboxInput from '@/components/Form/CheckboxInput.vue'
import UserForm from '@/components/Form/UserForm.vue'
import PermissionLabel from '@/components/Label/PermissionLabel.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue'
import UserInfo from '@/components/User/UserInfo.vue'
import { useUserStore } from '@/stores/user'
import { ModifiedUser, SortByTypes } from '@/types/user'
import { storeToRefs } from 'pinia'
import { Ref, computed, ref } from 'vue'
import { toast, type ToastOptions } from 'vue3-toastify'

const props = defineProps<{
  users: ModifiedUser[][]
}>()
const userStore = useUserStore()
const {
  getUsers: paginatedUsersFromStore,
  getUserToDelete: userToDelete,
  getSelectAllActive: selectAllActive,
  getUsersLength: usersLength,
  getCurrentPage: currentPage,
} = storeToRefs(userStore)
const actionsIsVisible: Ref<boolean> = ref(false)
let hoverIndex: Ref<number | null> = ref(null)
const isModalOpen: Ref<boolean> = ref(false)
const tableUpdateKey: Ref<number> = ref(0)

// Pagination
const paginatedUsers = computed(() => props.users[currentPage.value - 1])

// Set current page and deselect all users on page change
const handlePaginate = (page: number) => {
  userStore.setCurrentPage(page)
  userStore.setSelectAllActive(false)
  userStore.selectAllUsers()

  // Scroll to top on smaller screen sizes
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

/* ************************ Hover functions ************************ */
const handleItemOnHover = (userId): void => {
  actionsIsVisible.value = true
  hoverIndex.value = userId
}

const handleItemOnLeave = (): void => {
  actionsIsVisible.value = false
  hoverIndex.value = null
}

/* ************************ Select/Checkbox functions ************************ */

// Update the selected items array
const handleAddToSelected = (id: number): void => {
  userStore.updateSelectedItems(id)
  userStore.setUserAdditionInProgress(false)
}

// Select all users and force update table
const handleSelectAllUsers = (): void => {
  userStore.setSelectAllActive(!selectAllActive.value)
  userStore.selectAllUsers()
  userStore.setUserAdditionInProgress(false)
  tableUpdateKey.value++
}

/* ************************ User Edit functions ************************ */

// Click on edit button - update editMode to true and set the user id to be edited
const handleEditUser = (id: number): void => {
  userStore.setEditMode(true)
  userStore.setUserAdditionInProgress(false)
  userStore.setEditedUserId(id)
}

// Submit the edited user data
const handleEditUserSubmit = (userData): void => {
  userStore.editUser(userData)
  handleEditUserCancel()

  toast(`${userData.name} succesfully edited!`, {
    type: 'success',
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions)
}

// Click on cancel button - cancel the edit mode, close form
const handleEditUserCancel = (): void => {
  userStore.setEditMode(false)
  userStore.setEditedUserId(null)
}

/* ************************ Delete/Popup functions ************************ */

// Click on delete button - set the user id to be deleted and open the modal
const handleDeleteUserBtnClick = (id: number): void => {
  userStore.setDeleteUserId(id)
  isModalOpen.value = true
}

// Close the delete modal
const handleCloseDeleteModal = (): void => {
  isModalOpen.value = false
}

// Confirm the delete modal
const onDeleteModalConfirm = (): void => {
  if (userStore.deleteUserId === null) return

  userStore.deleteUser(userStore.deleteUserId)
  userStore.setDeleteUserId(null)
  isModalOpen.value = false

  toast('User Deleted!', {
    type: 'success',
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions)
}

/* ************************ Sort functions ************************ */

// Sort the table by user or permission
const handleSortBy = (type: SortByTypes): void => {
  userStore.setSortBy(type)
}
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-flow: column wrap;
  justify-items: center;
  width: 100%;

  .phone-actions {
    display: none;
  }

  @include until-smallphone {
    .desktop-actions {
      display: none;
    }

    .phone-actions {
      display: flex;
    }
  }

  &-header {
    display: grid;
    grid-template-columns: 30px 3fr 2fr 1fr;
    gap: $padding-xs;
    padding: $padding-sm $padding-sm;

    @include until-smallphone {
      grid-template-columns: 1fr;
      justify-items: center;
      justify-content: center;

      background: $primary;
      border-radius: 20px;

      .permission-text,
      .user-text {
        display: none;
      }

      .select-text {
        display: block !important;
        font-weight: 600;
      }
    }
    .select-text {
      display: none;
    }
  }

  &-body {
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    min-height: 546px;

    @include until-phone {
      min-height: auto;
    }

    &__row__wrapper {
      display: grid;
      grid-template-columns: 30px 3fr 2fr 1fr;
      gap: $padding-xs;
      padding: $padding-sm $padding-sm;
      border-radius: 20px;
      transition: all 0.3s linear;

      @include until-smallphone {
        grid-template-columns: 1fr;
        justify-items: center;
      }

      &:hover {
        background: $hover;
      }
    }

    &__row {
      &__checkbox {
        display: flex;
        align-items: center;
      }

      &__info {
        display: flex;
        flex-flow: column wrap;
      }

      &__labels {
        display: flex;
        align-items: center;
        & > * {
          margin-right: 10px;
        }
      }

      &__actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: $padding-xs;
        transition: all 0.3s linear;
      }
    }

    &__form {
      margin: $padding-xs 0;
    }
  }

  &-footer {
    display: flex;
    gap: $padding-xs;
    padding: $padding-xs;
    background: $light;

    margin-top: $padding-sm;

    @include until-smallphone {
      justify-content: center;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      .nav-arrow {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }

      .arrow-disabled {
        opacity: 0.4;
      }
    }
  }

  .permission-text,
  .user-text {
    cursor: pointer;
  }

  .active-sort {
    font-weight: 600;
  }
}

@include until-smallphone {
  .table-body__row {
    &__wrapper {
      background: $primary;
      margin: $padding-xs 0;
    }
  }
}

// Action buttons animation
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// Pagination
::v-deep .pagination-container {
  display: flex;
  column-gap: 10px;
}
::v-deep .paginate-buttons {
  height: 35px;
  width: 35px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s linear;
}
::v-deep .paginate-buttons:hover {
  background: $hover;
}
::v-deep .active-page {
  background: $secondary;
  border: 1px solid $secondary;
  color: white;
}
::v-deep .active-page:hover {
  background: $secondary;
}
</style>
