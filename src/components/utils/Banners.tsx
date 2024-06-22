import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import PWABanner from '@/components/utils/PWABanner';
import CookiesModal from '@/app/ui/utils/CookiesModal';
import Loader from "@/components/utils/Loader";

export default async function Banners() {
  const tPWA = await getTranslations("pwa");
  const tAcceptCookies = await getTranslations("acceptcookies");
  const cookieStore = cookies();
  const installpwa = cookieStore.has('app.installpwa');
  const acceptcookies = cookieStore.has('app.acceptcookies');

  return (
    <>
      {!installpwa && <PWABanner
        title={tPWA("title")}
        description={tPWA("description")}
        installBtn={tPWA("installBtn")}
        closeBtn={tPWA("closeBtn")}
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