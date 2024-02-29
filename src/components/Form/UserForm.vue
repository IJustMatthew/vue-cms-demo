<template>
  <div class="form">
    <Form
      :validation-schema="schema"
      @submit="submitForm()"
      v-slot="{ errors }"
      class="form__wrapper">
      <div class="form__input__wrapper">
        <label for="name">Name</label>
        <Field
          class="form__input"
          name="name"
          type="text"
          placeholder="Enter Name"
          v-model="name" />
        <span class="form__input__error">{{ errors.name }}</span>
      </div>

      <div class="form__input__wrapper">
        <label for="email">Email</label>
        <Field
          class="form__input"
          name="email"
          type="email"
          placeholder="Enter Email"
          v-model="email" />
        <span class="form__input__error">{{ errors.email }}</span>
      </div>
      <div class="form__input__wrapper">
        <label for="permission">Permission</label>
        <Field
          class="form__input"
          name="permission"
          placeholder="Select"
          selected="agent"
          v-model="permission">
          <v-select
            :options="permissionOptions"
            :selected="permission"
            v-model="permission"
            :clearable="false"
            :searchable="false"
            :disabled="editMode">
          </v-select>
        </Field>
        <span class="form__input__error">{{ errors.permission }}</span>
      </div>
      <div class="form__actions__wrapper">
        <ButtonComponent
          type="secondary"
          :text="editMode ? 'Save' : 'Add'"
          :is-disabled="formIsDisabled"
          :min-width="100" />
        <ButtonComponent
          type="cancel"
          text="Cancel"
          @clicked="cancelForm"
          :min-width="100" />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import { EMAIL_REGEX } from '@/composables/regex'
import { useUserStore } from '@/stores/user'
import { UserFormProps } from '@/types/user'
import { storeToRefs } from 'pinia'
import { Field, Form, useField, useForm } from 'vee-validate'
import { Ref, ref, watch } from 'vue'
import 'vue-select/dist/vue-select.css'

const emits = defineEmits(['submit', 'cancel'])
const userStore = useUserStore()
const { getEditMode: editMode } = storeToRefs(userStore)

const props = defineProps({
  id: Number,
  name: String,
  email: String,
  permission: String,
})

const permissionOptions: Ref<string[]> = ref(['admin', 'agent', 'user'])

// Vee validate validation schema
const schema = {
  name: 'required|fullName',
  email: 'required|email',
  permission: 'required',
}

// useForm hook for manual form handling
const { handleSubmit } = useForm({
  initialValues: {
    name: props.name ?? '',
    email: props.email ?? '',
    permission: props.permission ?? 'agent',
  },
  validationSchema: schema,
})

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: permission } = useField('permission')
const formIsDisabled = ref(true)

// Submit form
const submitForm = handleSubmit((values, actions): void => {
  let userData: UserFormProps = { ...values }
  if (props.id) {
    userData = { ...values, id: props.id }
  }
  emits('submit', userData)
  actions.resetForm()
})

// Cancel form
const cancelForm = (): void => {
  emits('cancel')
}

// Watch form fields for changes - enable/disable form submit button
watch([name, email], ([name, email]) => {
  if (name && email && permission && (email as string).match(EMAIL_REGEX)) {
    formIsDisabled.value = false
  } else {
    formIsDisabled.value = true
  }
})
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  background: $hover;
  border-radius: 10px;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;

    @include until-phone {
      grid-template-columns: 1fr;
    }
  }

  &__actions__wrapper {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 28px;

    @include until-phone {
      justify-content: center;
    }
  }

  &__input__wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px 10px;

    & input,
    select {
      height: 45px;
      padding: 5px 10px;

      background: $hover;
      border: 1px solid $inactive;
      border-radius: 10px;
      transition: all 0.3s linear;

      &::placeholder {
        opacity: 0.6;
      }

      &:focus {
        outline: none;
        border-bottom: 2px solid $secondary;
      }
    }

    & label {
      color: $inactive;
      margin-bottom: 0;
    }
  }

  &__input__error {
    color: $error;
    font-size: 0.8rem;
  }
}

::v-deep .vs__dropdown-toggle {
  height: 45px;
  padding: 5px 10px;
  background: $hover;
  border: 1px solid $inactive;
  border-radius: 10px;
  transition: all 0.3s linear;
}

::v-deep .vs--disabled .vs__dropdown-toggle {
  background: $cancel;

  & input {
    background: $cancel;
  }

  & svg {
    background-color: $cancel;
  }
}
</style>
