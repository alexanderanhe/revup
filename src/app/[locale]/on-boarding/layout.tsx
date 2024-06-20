import { redirect } from "@/navigation";
import { cookies } from "next/headers";

type OnBoardingLayoutProps = {
  children: React.ReactNode;
};

export default function OnBoardingLayout({ children }: OnBoardingLayoutProps) {
  const cookieStore = cookies();
  const hasOnBoarding = cookieStore.has('app.onboarding');

  if (hasOnBoarding) {
    redirect('/home');
  }
  return children;
}