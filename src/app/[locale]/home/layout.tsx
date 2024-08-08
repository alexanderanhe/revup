import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { APPCOOKIES, User } from "@/lib/definitions";
import { auth } from "@/auth";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getUserPlans } from "@/lib/data";
import ChangeDefaultPlanButton from "@/app/ui/home/ChangeDefaultPlanButton";

type HomeLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function HomeLayout({ children, params: { locale } }: HomeLayoutProps) {
  const session = await auth();
  const user = (session?.user as User);
  const cookieStore = cookies();

  const userHasOnboarding = user?.info?.onboarding;
  const userAssessment = user?.info?.assessment;
  const cookiesHasOnBoarding = cookieStore.has(APPCOOKIES.ONBOARDING);
  const { ON_BOARDING, ASSESSMENT } = PAGES;

  if (
    user && !userHasOnboarding
    || !user && !cookiesHasOnBoarding) {
    redirect(ON_BOARDING);
  }
  if (
    user && !userAssessment) {
    redirect(ASSESSMENT);
  }
  const plans = await getUserPlans(locale, user?.id);

  return (
    <LayoutContent
      title=""
      headerButton={<ChangeDefaultPlanButton plans={plans} />}
      head
      footer
      pullToRefresh
    >
      { children }
    </LayoutContent>
  );
}