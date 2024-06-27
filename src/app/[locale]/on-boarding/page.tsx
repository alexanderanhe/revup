import { cookies } from "next/headers";
import Slides from "@/app/ui/on-boarding/Slides";
import Login from "@/app/ui/on-boarding/Login";
import { APPCOOKIES, User } from "@/lib/definitions";
import { auth } from "@/auth";

export default async function OnBoardingPage() {
  const session = await auth();
  const user = (session?.user as User);
  const cookieStore = cookies();
  const hasOnBoarding = user && !user?.info?.onboarding
    || !user && cookieStore.has(APPCOOKIES.ONBOARDING);

  return (
    !hasOnBoarding ? <Slides />
    : <div className="content-grid grid-rows-[1fr_auto] w-full h-svh"><Login/></div>
  )
}