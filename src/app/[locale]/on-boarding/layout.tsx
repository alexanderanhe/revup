import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { APPCOOKIES } from "@/lib/definitions";
import { auth, currentUser, User } from "@clerk/nextjs/server";

type OnBoardingLayoutProps = {
  children: React.ReactNode;
};

export default async function OnBoardingLayout({ children }: OnBoardingLayoutProps) {
  const { userId, sessionClaims } = await auth();
  const authenticated = !(userId === null || sessionClaims === null);
  if (!authenticated) { return null; }
  const user = await currentUser() as User;
  const cookieStore = cookies();

  const userHasOnboarding = (user?.publicMetadata as any)?.onboarded;
  const cookiesHasOnBoarding = cookieStore.has(APPCOOKIES.ONBOARDING);
  const { HOME } = PAGES;

  if (
    authenticated && userHasOnboarding
    || !authenticated && cookiesHasOnBoarding) {
    redirect(HOME);
  }
  return children;
}