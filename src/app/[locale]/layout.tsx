import type { Metadata, Viewport } from "next";
import { cookies } from 'next/headers';

import "./globals.css";
import Providers from "@/app/Providers";
import LogInDialog from "@/app/ui/dialogs/LogIn";
import { locales } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Banners from "@/components/utils/Banners";
import { auth } from "@/auth";
import { poppins } from "@/app/ui/fonts";
import { APPCOOKIES, THEMES, User } from "@/lib/definitions";
import { getMessages } from 'next-intl/server';
import { Toaster } from "sonner";

export async function generateMetadata() {
  const t = await getTranslations("Root");
  return {
    title: t("title"),
    description: t("description"),
    manifest: "/manifest.json",
  }
}

export async function generateViewport() {
  const theme = await checkTheme();
  const themeColor = THEMES.find(({ name }) => name === theme)?.bgcolor ?? '#53f074';
  return {
    themeColor: themeColor,
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

async function checkTheme() {
  const session = await auth();
  const user: User | undefined = session?.user;
  const cookieStore = cookies()
  const theme = user?.info?.theme ?? cookieStore.get(APPCOOKIES.THEME)?.value ?? '';
  return theme || cookieStore.get(APPCOOKIES.THEME)?.value;
}

export default async function LocaleLayout({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  unstable_setRequestLocale(locale);
  const theme = await checkTheme();

  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();
  const timeZone = process.env.TIME_ZONE ?? 'America/Mexico_City';

  return (
    <html lang={locale} data-theme={theme}>
      <body className={`${poppins.className} antialiased`}>
        <Banners />
        <Providers messages={messages} timeZone={timeZone}>
          {children}
          <LogInDialog />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
