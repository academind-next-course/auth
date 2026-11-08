'use client'
import Link from 'next/link';
import { useFormState } from 'react-dom';

import { SIGN_UP_FORM } from '@/lib/constants';
import { signUp } from '@/actions/auth-actions';

export default function AuthForm() {
  const [formState, formAction] = useFormState(signUp, {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name={SIGN_UP_FORM.EMAIL} id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name={SIGN_UP_FORM.PASSWORD} id="password" />
      </p>

      {formState?.errors &&
        Object.keys(formState.errors).map((error) => (
          <li key={error} id="form-errors">{formState.errors[error]}</li>
        ))}
      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
