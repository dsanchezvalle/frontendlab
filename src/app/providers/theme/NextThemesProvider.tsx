'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export function NextThemesProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
