import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import Dashboard from "@/app/ui/home/Dashboard";
import AssessmentBanner from "@/app/ui/home/AssessmentBanner";
import { APPCOOKIES } from "@/lib/definitions";
import CurrentPlan from "@/app/ui/home/CurrentPlan";
import { auth, currentUser, User } from "@clerk/nextjs/server";
import { checkUserPlanExists } from "@/lib/data";

export default async function HomePage({
  params: { locale }
}: {
  params: {
    locale: string;
  };
}) {
  const { userId, sessionClaims } = await auth();
  const authenticated = !(userId === null || sessionClaims === null);
  if (!authenticated) {
    return null;
  }
  const user = await currentUser() as User;
  await checkUserPlanExists(userId);
  const userHasAssessment = (user?.publicMetadata as any)?.assessment;

  const Assessment = async () => {
    const hasAssessment = userHasAssessment || cookies().has(APPCOOKIES.ASSESSMENT);
    if (hasAssessment) {
      return;
    }
    const t = await getTranslations("Assessment.banner")
    return (
      <AssessmentBanner
        title={t("title")}
        description={t("description")}
        buttonText={t("buttonText")}
      />
    )
  }

  return (
    <>
      <Assessment />
      <CurrentPlan user={user} locale={locale} />
      <Dashboard user={user} locale={locale} />
    </>
  );
}
