'use server'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
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
  const cookieStore = cookies();
  const res = NextResponse.next();
  cookieStore.set('app.installpwa', '0');
  res.cookies.set('app.installpwa', '0');
}
export async function handleOnboarding() {
  const cookieStore = cookies();
  const res = NextResponse.next();
  cookieStore.set('app.onboarding', '1');
  res.cookies.set('app.onboarding', '1');
}