import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { APPCOOKIES } from "@/lib/definitions";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  const cookieStore = cookies();
  const hasOnBoarding = cookieStore.has(APPCOOKIES.ONBOARDING);
  const { ON_BOARDING } = PAGES;

  if (!hasOnBoarding) {
    redirect(ON_BOARDING);
  }
  return children;
}