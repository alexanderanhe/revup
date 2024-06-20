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
  const res = NextResponse.next();
  cookies().set('app.installpwa', '0', { httpOnly: true });
  res.cookies.set('app.installpwa', '0', { httpOnly: true });
}
export async function handleOnboarding() {
  console.log("CLICKED ONBOARDING!!!")
  const res = NextResponse.next();
  cookies().set('app.onboarding', '1', { httpOnly: true });
  res.cookies.set('app.onboarding', '1', { httpOnly: true });
}