import { LogIndex } from "@/components/sections/log";
import type { Locale } from "@/lib/db/types/article";
import { listPublishedArticles } from "@/modules/log/services/articles";

type Params = { locale: Locale };

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
//   const t = await getTranslations({ locale, namespace: 'ArticlesPage' });

//   return {
//     title: t('meta.title'),
//     description: t('meta.description'),
//   };
// }

export default async function LogPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;

  // Fetch articles server-side (for future use when LogIndex accepts props)
  await listPublishedArticles(locale);

  return (
    <div className="min-h-screen">
      <LogIndex />
    </div>
  );
}
