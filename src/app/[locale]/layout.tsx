import type { Metadata } from "next";
import { DM_Sans, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProviders } from "@/providers";
import "../../styles/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Frontendlab",
  description: "A space to experiment, showcase projects and share insights on frontend development",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)){
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${lora.variable} ${jetBrains.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProviders>
            {children}
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
