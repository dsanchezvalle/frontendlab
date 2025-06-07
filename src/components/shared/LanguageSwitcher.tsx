'use client';

import {useParams} from 'next/navigation';
import {useTransition} from 'react';
import {usePathname, useRouter} from '@/i18n/navigation';
import {Locale} from 'next-intl';
import {ChevronDown, Check} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';

type Language = {
  code: Locale;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'es', name: 'Español', flag: '🇨🇴' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) ?? languages[1];

  function handleLanguageSelect(code: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error – Safe because params and pathname match
        { pathname, params },
        { locale: code }
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-0.5 sm:gap-1 h-9 px-2 sm:px-3 rounded-md focus-visible:ring-1 focus-visible:ring-ring${
            isPending ? ' opacity-70' : ''
          }`}
          aria-label="Select language"
        >
          <span className="text-base" aria-hidden="true">
            {currentLanguage.flag}
          </span>
          <span className="font-semibold text-sm uppercase min-w-[24px] text-center hidden sm:block">
            {currentLanguage.code}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[150px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`flex items-center gap-2 cursor-pointer py-2 ${
              currentLocale === language.code ? 'bg-muted' : ''
            }`}
            onClick={() => handleLanguageSelect(language.code)}
          >
            <span className="text-base" aria-hidden="true">
              {language.flag}
            </span>
            <span className="font-medium text-sm">{language.name}</span>
            {currentLocale === language.code && (
              <Check className="h-4 w-4 ml-auto" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
