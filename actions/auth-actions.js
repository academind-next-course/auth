'use server'
import { redirect } from "next/navigation"

import { SIGN_UP_FORM } from "@/lib/constants"
import { hashUserPassword } from "@/lib/hash"
import { createUser } from "@/lib/user"

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

  const hashedPassword = hashUserPassword(password)
  try {
    createUser(email, hashedPassword)
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errors: {
          email: 'That email is already taken!'
        }
      }
    }

    throw error;
  }

  redirect('/training')
}
