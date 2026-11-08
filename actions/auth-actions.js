'use server'

import { SIGN_UP_FORM } from "@/lib/constants"

export async function signUp(prevState, formData) {
  const email = formData.get(SIGN_UP_FORM.EMAIL)
  const password = formData.get(SIGN_UP_FORM.PASSWORD)

  const errors = {}
  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email'
  }

  if (password.length < 8) {
    errors.password = 'Your password must be longer than 8 characters'
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors
    }
  }

  // Store values in the DB
}
