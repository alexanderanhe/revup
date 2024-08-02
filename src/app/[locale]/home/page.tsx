import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { auth } from "@/auth";

import Dashboard from "@/app/ui/home/Dashboard";
import AssessmentBanner from "@/app/ui/home/AssessmentBanner";
import { APPCOOKIES, User } from "@/lib/definitions";
import CurrentPlan from "@/app/ui/home/CurrentPlan";

export default async function HomePage({
  params: { locale }
}: {
  params: {
    locale: string;
  };
}) {
  const session = await auth();
  const user = session?.user;

  const Assessment = async () => {
    const hasAssessment = (user as User)?.info?.assessment || cookies().has(APPCOOKIES.ASSESSMENT);
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
