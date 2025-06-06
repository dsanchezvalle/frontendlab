"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Language = {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "es", name: "Español", flag: "🇨🇴" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
]

interface LanguageSwitcherProps {
  defaultLanguage?: string
  onLanguageChange?: (code: string) => void
  className?: string
}

export function LanguageSwitcher({
  defaultLanguage = "en",
  onLanguageChange,
  className,
}: LanguageSwitcherProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState(defaultLanguage)
  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage) || languages[1]

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code)
    if (onLanguageChange) {
      onLanguageChange(code)
    }
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-0.5 sm:gap-1 h-9 px-2 sm:px-3 rounded-md focus-visible:ring-1 focus-visible:ring-ring"
            aria-label="Select language"
          >
            <span className="text-base" aria-hidden="true">
              {currentLanguage.flag}
            </span>
            <span className="font-semibold text-sm uppercase min-w-[24px] text-center hidden sm:block">{currentLanguage.code}</span>
            <ChevronDown className="h-4 w-4 opacity-70" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className={`flex items-center gap-2 cursor-pointer py-2 ${
                selectedLanguage === language.code ? "bg-muted" : ""
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <span className="text-base" aria-hidden="true">
                {language.flag}
              </span>
              <span className="font-medium text-sm">{language.name}</span>
              {selectedLanguage === language.code && (
                <Check className="h-4 w-4 ml-auto" aria-hidden="true" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
