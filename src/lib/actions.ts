'use server'

import { cookies } from 'next/headers';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { saveAssessment, saveAssessmentById, saveOnBoarding, saveTheme } from './data';
import { User } from './definitions';
 
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

async function deleteUnnecessaryCookies() {
  console.log('deleteUnnecessaryCookies')
  const session = await auth();
  const user = session?.user as User;
  if (user && !user?.assessment && cookies().has('app.assessment')) {
    const assessmentId = cookies().get('app.assessment');
    await saveAssessmentById(assessmentId);
    cookies().delete('app.assessment')
  }
  if (user && !user?.onboarding && cookies().has('app.onboarding')) {
    await saveOnBoarding();
    cookies().delete('app.onboarding')
  }
}

export async function authenticateGoogle(
  prevState: string | null,
  formData: FormData,
) {
  try {
    await signIn('google');
    await deleteUnnecessaryCookies();
    return 'done';
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

export async function authenticateFacebook(
  prevState: string | null,
  formData: FormData,
) {
  try {
    await signIn('facebook');
    await deleteUnnecessaryCookies();
    return 'done';
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

export async function authenticateGithub(
  prevState: string | null,
  formData: FormData,
) {
  try {
    await signIn('github');
    await deleteUnnecessaryCookies();
    return 'done';
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

export async function handleHidePWABanner(
  prevState: string | null,
  formData: FormData
) {
  try {
    cookies().set('app.installpwa', '0', { httpOnly: true });
    return 'done';
  } catch (error) {
    return 'error';
  }
}
export async function handleOnboarding(
  prevState: string | null,
  formData: FormData
) {
  try {
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
    const { assessment_id, user_id } = await saveAssessment(formData);
    !user_id && cookies().set('app.assessment', assessment_id, { httpOnly: true });
    return 'saved';
  } catch (error) {
    return 'error';
  }
}
export async function handleSetTheme(
  prevState: string | null,
  formData: FormData
) {
  try {
    const {theme, user_id} = await saveTheme(formData);
    !user_id && cookies().set('app.theme', theme, { httpOnly: true });
    return 'saved';
  } catch (error) {
    return 'error';
  }
}
export async function handleDeleteCookies() {
  cookies().getAll().forEach((cookie) => cookies().delete(cookie.name));
}