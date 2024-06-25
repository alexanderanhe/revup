import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { auth } from "@/auth";
import { APPCOOKIES } from "@/lib/definitions";

type OnBoardingLayoutProps = {
  children: React.ReactNode;
};

export default async function OnBoardingLayout({ children }: OnBoardingLayoutProps) {
  // const session = await auth();
  // const cookieStore = cookies();
  // const hasOnBoarding = cookieStore.has(APPCOOKIES.ONBOARDING);
  // const { HOME } = PAGES;

  // if (hasOnBoarding && session) {
  //   redirect(HOME);
  // }
  return children;
}