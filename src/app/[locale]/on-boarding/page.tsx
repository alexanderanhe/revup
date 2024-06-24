import { cookies } from "next/headers";
import Slides from "@/app/ui/on-boarding/Slides";
import Login from "@/app/ui/on-boarding/Login";

export default function OnBoardingPage() {
  const cookieStore = cookies();
  const hasOnBoarding = cookieStore.has('app.onboarding');

  return (
    !hasOnBoarding ? <Slides />
    : <div className="content-grid grid-rows-[1fr_auto] w-full h-svh"><Login/></div>
  )
}