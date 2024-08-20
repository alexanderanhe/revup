//i18n.ts
import { notFound } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';

export const locales: string[] = ['en', 'es'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  const timeZone = process.env.TIME_ZONE ?? 'America/Mexico_City';

  return {
    timeZone,
    messages: (await import(`../content/${locale}.json`)).default
  };
});

// fuente: https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing
// https://www.sitepoint.com/next-js-internationalization/