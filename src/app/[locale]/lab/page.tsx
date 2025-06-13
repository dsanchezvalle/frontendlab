import { LabIndex } from '@/components/sections/lab/LabIndex';

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
//   const t = await getTranslations({ locale, namespace: 'ArticlesPage' });

//   return {
//     title: t('meta.title'),
//     description: t('meta.description'),
//   };
// }

export default async function ArticlesPage() {

  return (
    <div className="min-h-screen">
      <LabIndex />
    </div>
  );
}
