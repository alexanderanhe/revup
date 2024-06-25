import { cookies } from "next/headers";
import Slides from "@/app/ui/on-boarding/Slides";
import Login from "@/app/ui/on-boarding/Login";
import { APPCOOKIES } from "@/lib/definitions";

export default function OnBoardingPage() {
  const cookieStore = cookies();
  const hasOnBoarding = cookieStore.has(APPCOOKIES.ONBOARDING);

  return (
    !hasOnBoarding ? <Slides />
    : <div className="content-grid grid-rows-[1fr_auto] w-full h-svh"><Login/></div>
  )
}