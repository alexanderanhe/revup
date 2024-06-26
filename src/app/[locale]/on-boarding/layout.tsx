import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { auth } from "@/auth";
import { APPCOOKIES, User } from "@/lib/definitions";

type OnBoardingLayoutProps = {
  children: React.ReactNode;
};

export default async function OnBoardingLayout({ children }: OnBoardingLayoutProps) {
  const session = await auth();
  const user = (session?.user as User);
  const cookieStore = cookies();

  const userHasOnboarding = user?.info?.onboarding;
  const cookiesHasOnBoarding = cookieStore.has(APPCOOKIES.ONBOARDING);
  const { HOME } = PAGES;

  if (
    user && userHasOnboarding
    || !user && cookiesHasOnBoarding) {
    redirect(HOME);
  }
  return children;
}