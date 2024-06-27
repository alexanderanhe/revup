import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { auth } from "@/auth";
import { APPCOOKIES, User } from "@/lib/definitions";

type AssessmentLayoutProps = {
  children: React.ReactNode;
};

export default async function AssessmentLayout({ children }: AssessmentLayoutProps) {
  const session = await auth();
  const user = (session?.user as User);
  const cookieStore = cookies();

  const userHasAssessment = user?.info?.assessment;
  const cookiesHasAssessment = cookieStore.has(APPCOOKIES.ASSESSMENT);
  const { HOME } = PAGES;

  if (
    user && userHasAssessment
    || !user && cookiesHasAssessment) {
    redirect(HOME);
  }
  return children;
}