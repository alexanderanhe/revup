import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from 'next/headers';

import "../globals.css";
import StoreProvider from "../StoreProvider";
import Loader from "@/components/utils/Loader";
import LogInDialog from "@/components/utils/dialogs/LogIn";
import { locales } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import PWABanner from "@/components/utils/pwaBanner/PWABanner";

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

export default function RootLayout({
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
        <PWABanner />
        <Suspense fallback={<Loader />}>
          <StoreProvider>
            {children}
            <LogInDialog />
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
