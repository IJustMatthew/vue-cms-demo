<template>
  <div class="checkbox-wrapper">
    <input
      class="input-cbx"
      :id="id"
      type="checkbox"
      v-model="toggle"
      @click="emits('clicked')" />
    <label class="cbx" :for="id">
      <span>
        <svg width="12px" height="10px" viewbox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'

type Props = {
  id: string
  selected?: boolean
}
const emits = defineEmits(['clicked'])
const props = defineProps<Props>()
const toggle: Ref<boolean> = ref(props.selected || false)
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  input[type='checkbox'] {
    display: none;
    visibility: hidden;
  }
  .cbx {
    margin: auto;
    -webkit-user-select: none;
    user-select: none;

    span {
      display: inline-block;
      vertical-align: middle;
      transform: translate3d(0, 0, 0);
      cursor: pointer;

      &:first-child {
        position: relative;
        width: 25px;
        height: 25px;
        border-radius: 8px;
        transform: scale(1);
        vertical-align: middle;
        border: 1px solid $inactive;
        transition: all 0.2s ease;

        svg {
          position: absolute;
          top: 7px;
          left: 5px;
          fill: none;
          stroke: $light;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 25px;
          stroke-dashoffset: 25px;
          transition: all 0.3s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0);
        }

        &:before {
          content: '';
          width: 100%;
          height: 100%;
          background: $theme1;
          display: block;
          transform: scale(0);
          opacity: 1;
          border-radius: 50%;
        }
      }
    }

    &:hover {
      span {
        &:first-child {
          border-color: $theme1;
        }
      }
    }
  }

  .input-cbx {
    &:checked {
      + {
        .cbx {
          span {
            &:first-child {
              background: $theme1;
              border-color: $theme1;
              animation: wave 0.4s ease;

              svg {
                stroke-dashoffset: 0;
              }

              &:before {
                transform: scale(3.5);
                opacity: 0;
                transition: all 0.6s ease;
              }
            }
          }
        }
      }
    }
  }
}

@keyframes wave {
  50% {
    transform: scale(1);
  }
}
</style>
