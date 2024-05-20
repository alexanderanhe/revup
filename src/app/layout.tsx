import type { Metadata, Viewport } from "next";
import Head from "next/head";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RevUp",
  description: "Revup Fitness Club - Aumenta tus músculos, tu resistencia y tu fuerza máxima o tonifícate con Ejercicios en el Gimnasio con series, repeticiones y pesos diseñados por expertos.",
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
    <html lang="es" data-theme="pastel">
      <body className={`${monserrat.className} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
