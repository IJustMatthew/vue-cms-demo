<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>

  <DeleteModal
    :isOpen="isModalOpen"
    @modal-close="handleCloseDeleteModal"
    @modal-confirm="onDeleteModalConfirm">
    <template #content>
      <p>
        Do you want to Delete <b>{{ selectedItems.length }} users</b> from the
        list?
      </p>
    </template>
    <template #footer></template>
  </DeleteModal>
  <XyzTransition appear xyz="fade front">
    <div class="users">
      <div class="users__add">
        <ButtonComponent
          text="+ Add New User"
          type="secondary"
          :isDisabled="editModeActive"
          @clicked="handleAddNewUser"
          v-if="!isSelectionActive" />
        <div v-if="userAdditionActive" class="users__add__form__wrapper">
          <UserForm
            v-if="!isSelectionActive"
            @submit="handleAddNewUserSubmit"
            @cancel="handleCancelNewUser" />
        </div>
      </div>

      <div v-if="selectedItems.length" class="users__bulk-actions">
        <p>{{ selectedItems.length }} users selected</p>
        <ButtonComponent
          text="Delete Selected users"
          type="secondary"
          icon="/img/icons/delete.svg"
          @clicked="handleBulkDeleteBtnClick" />
      </div>
      <div class="users__table">
        <TableComponent
          :users="users"
          :key="tableUpdateKey"
          v-if="users.length" />
        <p v-else class="users__table-empty">No users created yet!</p>
      </div>
    </div>
  </XyzTransition>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import UserForm from '@/components/Form/UserForm.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue'
import TableComponent from '@/components/Table/TableComponent.vue'
import { toast, type ToastOptions } from 'vue3-toastify'

import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { computed, ref, Ref } from 'vue'
import { useMeta } from 'vue-meta'

const userStore = useUserStore()
const {
  getUsers: users,
  getSelectedItems: selectedItems,
  getIsUserAdditionActive: userAdditionActive,
  getEditMode: editModeActive,
  getIsSelectionActive,
} = storeToRefs(userStore)
const isModalOpen: Ref<boolean> = ref(false)
const tableUpdateKey: Ref<number> = ref(0)
const isSelectionActive = computed(() => getIsSelectionActive.value)

// Init page's META info
const content = useMeta({
  title: 'Vue CMS demo',
  description:
    'Vue CMS demo created by Mate Sera, for educational and referential purposes.',
  og: {
    title: 'Vue CMS demo',
    description:
      'Vue CMS demo created by Mate Sera, for educational and referential purposes.',
    url: 'https://vue-cms-demo.matesera.com/',
    image: 'https://vue-cms-demo.matesera.com/img/og-image.png',
  },
})

/* ************************ User Addition functions ************************ */

const handleAddNewUser = (): void => {
  userStore.setEditMode(false)
  userStore.setUserAdditionInProgress(true)
}

const handleAddNewUserSubmit = (userData): void => {
  userStore.addUser(userData)
  userStore.setUserAdditionInProgress(false)

  toast(`${userData.name} succesfully added!`, {
    type: 'success',
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions)
}

const handleCancelNewUser = (): void => {
  userStore.setUserAdditionInProgress(false)
}

/* ************************ Deletion/Popup functions ************************ */

const handleBulkDeleteBtnClick = (): void => {
  isModalOpen.value = true
}

const handleCloseDeleteModal = (): void => {
  isModalOpen.value = false
}

const onDeleteModalConfirm = (): void => {
  userStore.deleteMultipleUsers()
  isModalOpen.value = false
  tableUpdateKey.value++

  toast('User(s) Deleted!', {
    type: 'success',
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions)
}
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-flow: column wrap;
  width: 100%;

  &__add {
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: flex-end;
    margin-bottom: $padding-sm;

    @include until-smallphone {
      align-items: center;
    }

    &__form__wrapper {
      width: 100%;
      margin-top: $padding-sm;
    }
  }

  &__bulk-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row wrap;
    gap: $padding-md;
    margin-bottom: $padding-sm;

    @include until-smallphone {
      justify-content: center;
      gap: 10px;
    }

    p {
      font-size: $font-lg;
      font-weight: 600;
    }
  }

  &__table {
    &-empty {
      padding: $padding-md;
      background: $hover;
      border-radius: 20px;
      font-size: $font-lg;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
