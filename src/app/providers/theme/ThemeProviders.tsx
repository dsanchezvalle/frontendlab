'use client';

import type { ReactNode } from 'react';
import { NextThemesProvider } from './NextThemesProvider';

export function ThemeProviders({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider>
      {children}
    </NextThemesProvider>
  );
}
