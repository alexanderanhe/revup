import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from 'next/headers';

import "./globals.css";
import Providers from "../Providers";
import LogInDialog from "@/components/utils/dialogs/LogIn";
import { locales } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import Banners from "@/components/utils/Banners";

const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bray.fit",
  description: "bray.fit Fitness Club - Aumenta tus músculos, tu resistencia y tu fuerza máxima o tonifícate con Ejercicios en el Gimnasio con series, repeticiones y pesos diseñados por expertos.",
  manifest: "/manifest.json",
};
 
export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function LocaleLayout({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  unstable_setRequestLocale(locale);
  const cookieStore = cookies()
  const theme = cookieStore.get('app.theme');

  return (
    <html lang={locale} data-theme={theme?.value ?? 'light'}>
      <body className={`${monserrat.className} antialiased`}>
        <Banners />
        <Providers>
          {children}
          <LogInDialog />
        </Providers>
      </body>
    </html>
  );
}
