<template>
  <div v-show="isOpen" class="modal__drawer">
    <div class="modal">
      <div class="modal__container" ref="target">
        <img
          src="/img/icons/close.svg"
          alt="close"
          class="close"
          @click="emit('modal-close')" />

        <!-- Modal header -->
        <div class="modal__header">
          <slot name="header"></slot>
        </div>

        <!-- Modal body -->
        <div class="modal__body">
          <slot name="content" />
        </div>

        <!-- Modal footer -->
        <div class="modal__footer">
          <slot name="footer">
            <ButtonComponent
              type="secondary"
              text="Delete"
              :min-width="150"
              @clicked="emit('modal-confirm')" />

            <ButtonComponent
              type="cancel"
              text="Cancle"
              :min-width="150"
              @clicked="emit('modal-close')" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import { onClickOutside } from '@vueuse/core'
import { defineEmits, defineProps, ref, Ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['modal-close', 'modal-confirm'])

const target: Ref = ref(null)
onClickOutside(target, () => emit('modal-close'))
</script>

<style scoped lang="scss">
.modal__drawer {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
}

.modal {
  font-size: $font-lg;
}

.modal__container {
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  text-align: center;

  min-width: 300px;
  margin: 40px 20px;
  padding: $padding-lg;

  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @include until-tablet {
    min-width: 90%;
    padding: $padding-md;
  }

  .close {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}

.modal__body {
  width: 70%;

  @include until-tablet {
    width: 100%;
  }
}

.modal__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: $padding-sm;

  margin-top: $padding-md;
}
</style>
