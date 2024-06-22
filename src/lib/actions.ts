'use server'

import { cookies } from 'next/headers';
import {  NextResponse } from 'next/server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  // prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function handleHidePWABanner() {
  cookies().set('app.installpwa', '0', { httpOnly: true });
}
export async function handleOnboarding() {
  cookies().set('app.onboarding', '1', { httpOnly: true });
}
export async function handleAcceptCookies() {
  cookies().set('app.acceptcookies', '1', { httpOnly: true });
}
export async function handleSetAssessment(formData: FormData) {
  console.log('formData', formData);
  cookies().set('app.assessment', JSON.stringify(formData), { httpOnly: true });
}
export async function handleDeleteCookies() {
  cookies().getAll().forEach((cookie) => cookies().delete(cookie.name));
}