import type { Metadata, Viewport } from "next";
import { cookies } from 'next/headers';

import "./globals.css";
import Providers from "../Providers";
import LogInDialog from "@/app/ui/dialogs/LogIn";
import { locales } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Banners from "@/components/utils/Banners";
import { auth } from "@/auth";
import { poppins } from "@/app/ui/fonts";
import { APPCOOKIES, User } from "@/lib/definitions";
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
  return {
    themeColor: theme === 'dark' ? '#1d232a' :'#FFFFFF',
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
  return user?.info?.theme ?? cookieStore.get(APPCOOKIES.THEME)?.value ?? 'light';
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

  return (
    <html lang={locale} data-theme={theme}>
      <body className={`${poppins.className} antialiased`}>
        <Banners />
        <Providers>
          {children}
          <LogInDialog />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
