import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import PWABanner from '@/app/ui/utils/PWABanner';
import CookiesModal from '@/app/ui/utils/CookiesModal';
import Loader from "@/app/ui/utils/Loader";
import { APPCOOKIES } from '@/lib/definitions';
import { PAGES } from '@/lib/routes';

export default async function Banners() {
  const tPWA = await getTranslations("pwa");
  const tAcceptCookies = await getTranslations("acceptcookies");
  const cookieStore = cookies();
  const installpwa = cookieStore.has(APPCOOKIES.PWA);
  const acceptcookies = cookieStore.has(APPCOOKIES.ACCEPTCOOKIES);
  const traductions = {
    title: tPWA("title"),
    description: tPWA("description"),
    installBtn: tPWA("installBtn"),
    closeBtn: tPWA("closeBtn")
  }
  return (
    <>
      {!installpwa && <PWABanner
        pages={[PAGES.HOME, PAGES.ROOT]}
        traductions={traductions}
      />}
      {!acceptcookies && <CookiesModal
        message={tAcceptCookies("message")}
        privacyPolicyBtn={tAcceptCookies("privacy")}
        aceptBtn={tAcceptCookies("accept")}
      />}
      <Loader />
    </>
  );
}