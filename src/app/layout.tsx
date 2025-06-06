import type { Metadata } from "next";
import { DM_Sans, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProviders } from "@/providers";
import "../styles/globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${lora.variable} ${jetBrains.variable} font-sans antialiased`}
      >
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
