'use client';

import type { ReactNode } from 'react';
import { NextThemesProvider } from './NextThemesProvider';

export function ThemeProviders({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
