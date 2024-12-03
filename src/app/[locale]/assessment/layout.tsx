import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { APPCOOKIES } from "@/lib/definitions";
import { auth, currentUser, User } from "@clerk/nextjs/server";

type AssessmentLayoutProps = {
  children: React.ReactNode;
};

export default async function AssessmentLayout({ children }: AssessmentLayoutProps) {
  const { userId, sessionClaims } = await auth();
  const authenticated = !(userId === null || sessionClaims === null);
  if (!authenticated) { return null; }
  const user = await currentUser() as User;
  const cookieStore = cookies();

  const userHasAssessment = (user?.publicMetadata as any)?.assessment;
  const cookiesHasAssessment = cookieStore.has(APPCOOKIES.ASSESSMENT);
  const { HOME } = PAGES;

  if (
    authenticated && userHasAssessment
    || !authenticated && cookiesHasAssessment) {
    redirect(HOME);
  }
  return children;
}