import { cookies } from "next/headers";
import Slides from "@/app/ui/on-boarding/Slides";
import Login from "@/app/ui/on-boarding/Login";
import { APPCOOKIES, User } from "@/lib/definitions";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function OnBoardingPage() {
  const { userId, sessionClaims} = await auth();
  const authenticated = !(userId === null || sessionClaims === null);
  const user = await currentUser();
  const cookieStore = cookies();
  const hasOnBoarding = authenticated && (user?.publicMetadata as any)?.onboarded
    || !authenticated && cookieStore.has(APPCOOKIES.ONBOARDING);

  return (
    !hasOnBoarding ? <Slides />
    : <div className="content-grid grid-rows-[1fr_auto] w-full h-svh"><Login/></div>
  )
}