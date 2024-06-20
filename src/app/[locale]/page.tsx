import { getTranslations } from 'next-intl/server';

import NavHeader from '@/components/main-landing-page/NavHeader';
import HeroSection from '@/components/main-landing-page/HeroSection';
import AboutSection from '@/components/main-landing-page/AboutSection';
import WorkoutPlanerSection from '@/components/main-landing-page/WorkoutPlanerSection';
import PricingSection from '@/components/main-landing-page/PricingSection';
import CallToActionSection from '@/components/main-landing-page/CallToActionSection';
import FooterSection from '@/components/main-landing-page/FooterSection';

export default async function IndexPage() {
  const t = await getTranslations("MainLangingPage"); // Await the getTranslations function call

  return (
    <div className="leading-normal tracking-normal text-white gradient">
      <NavHeader />
      <HeroSection />
      <AboutSection />
      <WorkoutPlanerSection />
      <PricingSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
}
