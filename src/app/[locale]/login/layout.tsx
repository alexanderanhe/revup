import { cookies } from "next/headers";
import { APPCOOKIES, User } from "@/lib/definitions";
import { saveAssessmentById } from "@/lib/data";

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default async function LoginLayout({ children }: LoginLayoutProps) {
  // const session = await auth();
  // const user = (session?.user as User);
  // const cookieStore = cookies();

  // if (user && !(user as User)?.info?.assessment && cookieStore.has(APPCOOKIES.ASSESSMENT)) {
  //   const assessmentId = cookieStore.get(APPCOOKIES.ASSESSMENT);
  //   await saveAssessmentById(assessmentId);
  //   // cookieStore.delete(APPCOOKIES.ASSESSMENT)
  // }
  // if (user && !(user as User)?.info?.onboarding && cookieStore.has(APPCOOKIES.ONBOARDING)) {
  //   await saveOnBoarding();
  //   // cookieStore.delete(APPCOOKIES.ONBOARDING)
  // }
  return children;
}