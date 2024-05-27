import type { Metadata, Viewport } from "next";
import Head from "next/head";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";
import Loader from "@/components/utils/Loader";

const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RevUp",
  description: "Revup Fitness Club - Aumenta tus músculos, tu resistencia y tu fuerza máxima o tonifícate con Ejercicios en el Gimnasio con series, repeticiones y pesos diseñados por expertos.",
  manifest: "/manifest.json",
};
 
export const viewport: Viewport = {
  themeColor: 'white',
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
  return (
    <html lang="es" data-theme="brayfit">
      <body className={`${monserrat.className} antialiased`}>
        <Suspense fallback={<Loader />}>
          <StoreProvider>{children}</StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
