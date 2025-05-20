'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
        variant="ghost"
        >
      <div className="relative w-5 h-5">
        <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 opacity-100 dark:opacity-0 transition-opacity" />
        <Sun className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-500 w-5 h-5 opacity-0 dark:opacity-100 transition-opacity" />
      </div>
    </Button>
  );
}
