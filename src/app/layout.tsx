import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from 'next/headers';

import "./globals.css";
import StoreProvider from "./StoreProvider";
import Loader from "@/components/utils/Loader";
import InstallPWAButton from "@/components/utils/InstallPWAButton";
import LogInDialog from "@/components/utils/dialogs/LogIn";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies()
  const theme = cookieStore.get('app.theme');

  return (
    <html lang="es" data-theme={theme?.value ?? 'light'}>
      <body className={`${monserrat.className} antialiased`}>
        <InstallPWAButton />
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
