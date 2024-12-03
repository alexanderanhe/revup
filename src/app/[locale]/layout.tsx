import "./globals.css";
import Providers from "@/app/Providers";
import LogInDialog from "@/app/ui/dialogs/LogIn";
import { locales } from "@/i18n";
import Banners from "@/components/utils/Banners";
import { getMessages } from 'next-intl/server';
import { Toaster } from "sonner";

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {

  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();
  const timeZone = process.env.TIME_ZONE ?? 'America/Mexico_City';

  return (
    <>
      <Banners />
      <Providers messages={messages} timeZone={timeZone}>
        {children}
        <LogInDialog />
      </Providers>
      <Toaster />
    </>
  );
}
