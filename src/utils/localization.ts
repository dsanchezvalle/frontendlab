type Locale = "en" | "es" | "pt";

type Localizable<T = string> =
  | {
      [key in Locale]?: T;
    }
  | T;

/**
 * Gets localized content from an object with locale properties
 * @param content - The localizable content (object with locale keys or direct value)
 * @param locale - The target locale ('en', 'es', 'pt')
 * @param fallbackLocale - Fallback locale if target not found (default: 'en')
 * @returns The localized string
 */
export function getLocalizedContent(
  content: Localizable | undefined,
  locale: Locale,
  fallbackLocale: Locale = "en"
): string {
  if (content == null) return "";

  if (typeof content === "string") return content;

  if (typeof content === "object") {
    const localizedValue = content[locale] || content[fallbackLocale];
    if (localizedValue) return localizedValue;

    // Fallback to any available value
    const firstValidValue = Object.values(content).find(
      (v) => typeof v === "string"
    );
    return (firstValidValue as string) || "";
  }

  return String(content);
}

/**
 * Formats a date according to locale preferences
 * @param date - Date object, string or undefined
 * @param locale - Locale to format for ('en', 'es', 'pt')
 * @returns Formatted date string or undefined if no date provided
 */
export function formatLocalizedDate(
  date?: Date | string | null,
  locale: Locale = "en"
): string | undefined {
  if (!date) return undefined;

  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
