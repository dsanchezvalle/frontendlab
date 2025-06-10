import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
//   const t = await getTranslations({ locale, namespace: 'ArticlesPage' });

//   return {
//     title: t('meta.title'),
//     description: t('meta.description'),
//   };
// }

export default async function ArticlesPage() {
  const t = await getTranslations('ArticlesPage');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-muted-foreground mb-8">{t('description')}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border p-4 rounded-md shadow-sm bg-background">
          <h2 className="text-lg font-semibold">{t('example.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('example.description')}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button variant="ghost" className="font-medium cursor-pointer">
            {t('backToHome')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
