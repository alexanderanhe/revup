import type { Metadata, Viewport } from "next";
import { cookies } from 'next/headers';

import "./globals.css";
import Providers from "../Providers";
import LogInDialog from "@/components/utils/dialogs/LogIn";
import { locales } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import Banners from "@/components/utils/Banners";
import { auth } from "@/auth";
import { poppins } from "@/app/ui/fonts";
import { APPCOOKIES } from "@/lib/definitions";

export const metadata: Metadata = {
  title: "bray.fit",
  description: "bray.fit Fitness Club - Aumenta tus músculos, tu resistencia y tu fuerza máxima o tonifícate con Ejercicios en el Gimnasio con series, repeticiones y pesos diseñados por expertos.",
  manifest: "/manifest.json",
};
 
export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

async function checkTheme() {
  const session = await auth();
  const user: any = session?.user;
  const cookieStore = cookies()
  return user?.theme ?? cookieStore.get(APPCOOKIES.THEME)?.value ?? 'light';
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
      </body>
    </html>
  );
}
