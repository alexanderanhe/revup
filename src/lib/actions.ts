'use server'

import { cookies } from 'next/headers';
import {  NextResponse } from 'next/server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { wait } from '@/lib/data';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
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
export async function handleOnboarding(
  prevState: string | null,
  formData: FormData
) {
  try {
    await wait(1000);
    cookies().set('app.onboarding', '1', { httpOnly: true });
    return 'done';
  } catch (error) {
    return 'error';
  }
}
export async function handleAcceptCookies(
  prevState: string | null,
  formData: FormData
): Promise<string> {
  try {
    await wait(1000);
    cookies().set('app.acceptcookies', '1', { httpOnly: true });
    return 'done';
  } catch (error) {
    return 'error';
  }
}
export async function handleSetAssessment(
  prevState: string | null,
  formData: FormData
) {
  try {
    await wait(1000);
    console.log('formData', formData);
    cookies().set('app.assessment', JSON.stringify(formData), { httpOnly: true });
    return 'saved';
  } catch (error) {
    return 'error';
  }
}
export async function handleDeleteCookies() {
  cookies().getAll().forEach((cookie) => cookies().delete(cookie.name));
}