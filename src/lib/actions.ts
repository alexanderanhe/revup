'use server'

import { cookies } from 'next/headers';
import { AuthError } from 'next-auth';
import { Resend } from 'resend';
import webpush from "web-push";

import { auth, signIn, signOut } from '@/auth';
import {
  createUser,
  saveAssessment,
  setWorkoutItem,
  saveAssessmentById,
  saveOnBoarding,
  saveTheme,
  setWorkoutsUserLiked,
  wait,
  setWorkoutCloseDay,
  setUserPlanStartedAt,
  saveDashboard,
  setAsCurrentPlan,
  getSubscription
} from '@/lib/data';
import { ActionFormState, APPCOOKIES, User } from '@/lib/definitions';
import { revalidatePath } from 'next/cache';
import { PAGES } from '@/lib/routes';
import { deleteImage, uploadImages } from './services/cloudflare';
 
// ...
 
export async function authenticate(
  prevState: ActionFormState | undefined,
  formData: FormData,
): Promise<ActionFormState> {
  try {
    const response = await signIn('credentials', formData);
    console.log(response);
    return { status: 'success' };
  } catch (error: any) {
    let message = error?.message;
    return { status: 'error', message };
  }
}

export async function forgetPassword(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const user: User = Object.fromEntries(Array.from(formData.entries()));
    if (!user.email) return

    const resend = new Resend(process.env.AUTH_RESEND_KEY);

    resend.emails.send({
      from: 'brayfit@angulo.dev',
      to: user.email,
      subject: 'Hello World',
      html: '<p>Forget your password!</p>'
    });
    return 'done';
  } catch (error) {
    return 'error';
  }
}

export async function logOut(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signOut();
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

export async function registerUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const user: User = Object.fromEntries(Array.from(formData.entries()));
    if (!user.name || !user.email || !user.password) return
    await createUser(user);
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

export async function authenticateGoogle(
  prevState: string | null,
  formData: FormData,
) {
  try {
    await signIn('google');
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

export async function handleSetCurrentPlan(
  prevState: ActionFormState | null,
  formData: FormData
): Promise<ActionFormState> {
  try {
    const plan_id = formData.get('plan_id');
    const session = await auth();
    const user = (session?.user as User);
    if (!plan_id) throw 'No plan id';
    if (user) {
      await setAsCurrentPlan(user.id as string, plan_id as string);
      revalidatePath(`${PAGES.HOME}`);
      return { status: 'success'};
    }
    return { status: 'error', message: 'There is no session'};
  } catch (error: any) {
    return { status: 'error', message: error.message};
  }
}

export async function handleSetWorkoutItem(
  prevState: string | null,
  formData: FormData
) {
  try {
    const form = Object.fromEntries(Array.from(formData.entries()));
    const status = await setWorkoutItem(form);
    revalidatePath(`${PAGES.EXERCISES}/run`);
    return status;
  } catch (error) {
    return 'error';
  }
}
export async function handleSetWorkoutLiked(
  prevState: boolean | null | 'error',
  formData: FormData
) {
  try {
    const { workoutId, enabled } = Object.fromEntries(Array.from(formData.entries()));
    revalidatePath(`${PAGES.WORKOUT}/${workoutId}`);
    return await setWorkoutsUserLiked(<string>workoutId, enabled === '1' );
  } catch (error) {
    return 'error';
  }
}
export async function handleSetWorkoutCloseDay(
  prevState: ActionFormState | null,
  formData: FormData
): Promise<ActionFormState> {
  try {
    const form = Object.fromEntries(Array.from(formData.entries()));
    const state = await setWorkoutCloseDay(form);
    revalidatePath(PAGES.HOME);
    return state;
  } catch (error) {
    return { status: 'error', message: 'Error saving data' };
  }
}
export async function handleStartWorkoutDay(
  prevState: { status: 'done', date?: string} | { status: 'error' | ''} | null,
  formData: FormData
): Promise<{ status: 'done', date?: string} | { status: 'error' | ''}> {
  try {
    const d = await setUserPlanStartedAt();
    if (d === null || d === "error") {
      return { status: "error" }
    }
    return {
      status: "done",
      date: d
    }
  } catch (error) {
    return { status: 'error' };
  }
}
export async function handleFinishWorkoutDay(
  prevState: string | null,
  formData: FormData
) {
  try {
    return "saved";
  } catch (error) {
    return 'error';
  }
}

export async function handleUploadImages(
  prevState: ActionFormState | null,
  formData: FormData
): Promise<ActionFormState> {
  // Mutate data
  const images = formData.getAll('images') as unknown as FileList;
  try {
    const promises = await uploadImages(images);
    revalidatePath(PAGES.ADMIN);
    return {status: 'success'};
  } catch (error) {
    return {status: 'error', message: 'Error uploading images'};
  }
}

export async function handleDeleteImage(
  prevState: ActionFormState | null,
  formData: FormData
): Promise<ActionFormState> {
  try {
    const imageId = formData.get('imageId');
    if (!imageId) throw 'No image id';
    const status = await deleteImage(imageId as string);
    if (!status) throw 'Error deleting image';
    revalidatePath(PAGES.ADMIN);
    return { status: 'success'};
  } catch (error) {
    return { status: 'error', message: 'Error deleting image'};
  }
}

export async function handleDashboard(
  prevState: ActionFormState | null,
  formData: FormData
): Promise<ActionFormState> {
  try {
    const { dashboard } = Object.fromEntries(Array.from(formData.entries()));
    if (dashboard) {
      const state = await saveDashboard(dashboard as string);
      revalidatePath(PAGES.HOME);
      return state;
    }
    return { status: 'error', message: 'Error saving data' };
  } catch (error: any) {
    return { status: 'error', message: error?.message ?? 'Error saving data' };
  }
}
export async function handleHidePWABanner(
  prevState: string | null,
  formData: FormData
) {
  try {
    cookies().set(APPCOOKIES.PWA, '0', { httpOnly: true });
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
    const session = await auth();
    const user = (session?.user as User);
    if (!user) {
      cookies().set(APPCOOKIES.ONBOARDING, '1', { httpOnly: true });
      return 'done';
    }
    await saveOnBoarding();
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
    cookies().set(APPCOOKIES.ACCEPTCOOKIES, '1', { httpOnly: true });
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
    !user_id && cookies().set(APPCOOKIES.ASSESSMENT, assessment_id, { httpOnly: true });
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
    !user_id && cookies().set(APPCOOKIES.THEME, theme, { httpOnly: true });
    revalidatePath(PAGES.ROOT, "layout");
    return 'saved';
  } catch (error) {
    return 'error';
  }
}
export async function handleDeleteCookies(
  prevState: string | null,
  formData: FormData,
) {
  cookies().getAll().forEach((cookie) => cookies().delete(cookie.name));
  return 'done';
}

export async function handleSendNotification(
  prevState: ActionFormState | null,
  formData: FormData
): Promise<ActionFormState> {
  try {
    const message = formData.get("message") as string;
    const user_id = formData.get("user_id") as string;
    const icon    = formData.get("icon")    as string;
    const name    = formData.get("name")    as string;

    if (!message || !user_id || !icon || !name) {
      return { status: "error", message: "invalid input(s)" };
    }
    const res = await sendNotification(message, user_id, icon, name);
    const success = res?.filter((r) => r.status === "success").length;
    const error = res?.filter((r) => r.status === "error").length;
    return { status: "success", message: `notification sent to ${success} subs, failed for ${error} subs` };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}

export const sendNotification = async (
	message: string,
	user_id: string,
	icon: string,
	name: string
): Promise<ActionFormState[]> => {
	const vapidKeys = {
		publicKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
		privateKey: process.env.VAPID_PRIVATE_KEY!,
	};
	//setting our previously generated VAPID keys
	webpush.setVapidDetails(
		"mailto:myuserid@email.com",
		vapidKeys.publicKey,
		vapidKeys.privateKey
	);

  const subscriptions = await getSubscription(user_id);
  const results: ActionFormState[] = [];
  subscriptions && subscriptions.forEach(async ({ subscription }: { subscription: any }) => {
    try {
      // get this info from the user's data
      // const pushSubscription = {
      //   endpoint: '.....',
      //   keys: {
      //     auth: '.....',
      //     p256dh: '.....'
      //   }
      // };
      await webpush.sendNotification(
        subscription,
        JSON.stringify({
          message: name,
          icon,
          body: message,
        })
      );
      results.push({ status: "success" });
    } catch (e: any) {
      console.log("failed to send notification", e);
      results.push({ status: "error", message: e.message });
    }
  });
  return results;
};