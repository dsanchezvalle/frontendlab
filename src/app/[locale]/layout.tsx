import type { Metadata } from "next";
import { DM_Sans, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProviders } from "@/providers";
import "../../styles/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeToggle } from "../../components/shared/ThemeToggle";
import LanguageSwitcher from "../../components/shared/LanguageSwitcher";
import Link from "next/link";
import { Code2 } from "lucide-react";

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
  description:
    "A space to experiment, showcase projects and share insights on frontend development",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${lora.variable} ${jetBrains.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProviders>
            <div className="min-h-screen gradient-background backdrop-blur bg-background/70">
              {/* Header */}
              <header className="z-50 backdrop-blur">
                <div className="px-4 py-4 flex items-center justify-between">
                  <Link href="/">
                    <div className="container flex items-center space-x-2 grow">
                      <Code2 className="h-6 w-6" />
                      <span className="font-mono font-bold text-lg">
                        Frontendlab
                      </span>
                    </div>
                  </Link>
                  <div className="flex items-center">
                    <nav className="hidden md:flex items-center space-x-4 flex-shrink-0 mr-4">
                      <Link
                        href={`/${locale}/log`}
                        className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {t("nav.log")}
                      </Link>
                      <Link
                        href={`/${locale}/lab`}
                        className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {t("nav.lab")}
                      </Link>
                      <Link
                        href="#about"
                        className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {t("nav.about")}
                      </Link>
                    </nav>
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              <main>{children}</main>
              <footer className="py-4">
                <div className="mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-1">
                      <Code2 className="h-4 w-4" />
                      <span className="font-mono font-medium">Frontendlab</span>
                      <span className="text-xs sm:text-sm">
                        {t("footer.author")} © {new Date().getFullYear()}.
                      </span>
                    </div>
                    <nav className="flex gap-4 font-sans">
                      <a
                        href="https://github.com/dsanchezvalle"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://www.linkedin.com/in/dsanchezvalle/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                      <a href="mailto:david@frontendlab.dev">Contact</a>
                    </nav>
                  </div>
                </div>
              </footer>
            </div>
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
