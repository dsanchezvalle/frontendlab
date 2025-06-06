import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // Locales supported
    locales: ['en', 'es', 'pt'],
    defaultLocale: 'en',
});