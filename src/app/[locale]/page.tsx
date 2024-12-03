// import { getTranslations } from 'next-intl/server';

import NavHeader from '@/app/ui/main-landing/NavHeader';
import HeroSection from '@/app/ui/main-landing/HeroSection';
import AboutSection from '@/app/ui/main-landing/AboutSection';
import WorkoutPlanerSection from '@/app/ui/main-landing/WorkoutPlanerSection';
import PricingSection from '@/app/ui/main-landing/PricingSection';
import CallToActionSection from '@/app/ui/main-landing/CallToActionSection';
import FooterSection from '@/app/ui/main-landing/FooterSection';
import GetInstalledRelatedApps from '@/app/ui/utils/GetInstalledRelatedApps';
import { auth } from '@clerk/nextjs/server';
import { redirect } from '@/navigation';

export default async function IndexPage() {
  const { userId, sessionClaims } = await auth();
  const authenticated = !(userId === null || sessionClaims === null);
  if (authenticated) {
    redirect('/home');
  }
  // const t = await getTranslations("MainLangingPage"); // Await the getTranslations function call
  return (
    <div className="leading-normal tracking-normal text-white gradient">
      <NavHeader />
      <HeroSection />
      <AboutSection />
      <WorkoutPlanerSection />
      <PricingSection />
      <CallToActionSection />
      <FooterSection />
      <GetInstalledRelatedApps />
    </div>
  );
}
