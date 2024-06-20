import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";

type OnBoardingLayoutProps = {
  children: React.ReactNode;
};

export default function OnBoardingLayout({ children }: OnBoardingLayoutProps) {
  const cookieStore = cookies();
  const hasOnBoarding = cookieStore.has('app.onboarding');
  const { HOME } = PAGES;

  if (hasOnBoarding) {
    redirect(HOME);
  }
  return children;
}