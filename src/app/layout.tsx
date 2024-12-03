import { cookies } from 'next/headers';
import { ClerkProvider } from '@clerk/nextjs';
import { poppins } from "@/app/ui/fonts";
import { getTranslations } from "next-intl/server";
import { APPCOOKIES, THEMES } from "@/lib/definitions";
import { currentUser } from '@clerk/nextjs/server';

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

async function checkTheme() {
  const user = await currentUser();
  const cookieStore = cookies()
  const theme = user?.unsafeMetadata?.theme ?? cookieStore.get(APPCOOKIES.THEME)?.value ?? '';
  return theme || cookieStore.get(APPCOOKIES.THEME)?.value;
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await checkTheme();
  return (
    <html>
      <body className={`${poppins.className} antialiased`}>
      <ClerkProvider>
        { children }
      </ClerkProvider>
      </body>
    </html>
  );
}
