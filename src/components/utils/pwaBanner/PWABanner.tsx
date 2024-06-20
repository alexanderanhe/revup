import { cookies } from 'next/headers';
import PWABannerClient from './PWABannerClient';
import { getTranslations } from 'next-intl/server';

export default async function PWABanner() {
  const t = await getTranslations("pwa");
  const cookieStore = cookies();
  const installpwa = cookieStore.has('app.installpwa');

  if (installpwa) return;

  return (
    <PWABannerClient
      title={t("title")}
      description={t("description")}
      installBtn={t("installBtn")}
      closeBtn={t("closeBtn")}
    />
  );
}