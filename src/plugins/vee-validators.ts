import { EMAIL_REGEX, FULL_NAME_REGEX } from '@/composables/regex'
import { defineRule } from 'vee-validate'

// Required rule
defineRule('required', (value: string | number) => {
  if (value !== undefined && value.toString().length < 1) {
    return 'Field is required to fill!'
  }
  return true
})

// Email rule
defineRule('email', (value: string) => {
  if (!value || !value.length) {
    return true
  }

  if (!String(value).toLowerCase().match(EMAIL_REGEX)) {
    return 'Invalid email format!'
  }

  return true
})

// Full name rule
defineRule('fullName', (value: string) => {
  if (!value || !value.length) {
    return true
  }

  if (!String(value).toLowerCase().match(FULL_NAME_REGEX)) {
    return 'Invalid name format!'
  }

  return true
})
