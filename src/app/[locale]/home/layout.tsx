import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { APPCOOKIES, User } from "@/lib/definitions";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getUserPlans } from "@/lib/data";
import ChangeDefaultPlanButton from "@/app/ui/home/ChangeDefaultPlanButton";
import { auth, currentUser } from "@clerk/nextjs/server";

type HomeLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function HomeLayout({ children, params: { locale } }: HomeLayoutProps) {
  const { userId, sessionClaims } = await auth();
  const authenticated = !(userId === null || sessionClaims === null);
  const user = await currentUser();
  const cookieStore = cookies();

  const userHasOnboarding = (user?.publicMetadata as any)?.onboarded;
  const userAssessment = (user?.publicMetadata as any)?.assessment;
  const cookiesHasOnBoarding = cookieStore.has(APPCOOKIES.ONBOARDING);
  const { ON_BOARDING, ASSESSMENT } = PAGES;

  if (
    authenticated && !userHasOnboarding
    || !authenticated && !cookiesHasOnBoarding) {
    redirect(ON_BOARDING);
  }
  if (
    authenticated && !userAssessment) {
    redirect(ASSESSMENT);
  }
  const plans = await getUserPlans(locale, userId);

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