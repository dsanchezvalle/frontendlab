import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ExternalLink,
  Calendar,
  Code2,
  Palette,
  Zap
} from "lucide-react";
import Link from 'next/link';

import { getTranslations, getLocale } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');
  const locale = await getLocale();

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t('hero.title')} <span className="text-primary font-mono">{t('hero.highlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-medium">{t('hero.cta.articles')}</Button>
              <Button size="lg" variant="outline" className="font-medium">{t('hero.cta.playground')}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Log */}
      <section id="articles" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-3 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold">{t('articles.title')}</h2>
              <Link href={`/${locale}/log`} className="flex items-center gap-2">
                <Button variant="outline" className="group cursor-pointer">
                    {t('articles.viewAll')}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
          </div>
          <p className="text-muted-foreground font-serif mb-8 max-w-6xl mx-auto">{t('articles.description')}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{t(`articles.item${i}.date`)}</span>
                  </div>
                  <CardTitle>{t(`articles.item${i}.title`)}</CardTitle>
                  <CardDescription>{t(`articles.item${i}.description`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{t(`articles.item${i}.tag1`)}</Badge>
                    <Badge variant="secondary">{t(`articles.item${i}.tag2`)}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-left max-w-6xl mx-auto">
            <Link href={`/${locale}/log`} className="sm:hidden">
                <Button variant="outline" className="group cursor-pointer">
                    {t('articles.viewAll')}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
          </div>
        </div>
      </section>

      {/* The Lab */}
      <section id="playground" className="py-16">
        <div className="container mx-auto px-4">
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('playground.title')}</h2>
            <p className="text-muted-foreground font-serif">{t('playground.description')}</p>
          </div> */}

          <div className="flex items-center justify-between mb-3 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold">{t('playground.title')}</h2>
              <Link href={`/${locale}/lab`} className="flex items-center gap-2">
                <Button variant="outline" className="group cursor-pointer">
                    {t('playground.viewAll')}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
          </div>
          <p className="text-muted-foreground font-serif mb-8 max-w-6xl mx-auto">{t('playground.description')}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3 ].map((i) => {
              const iconComponents = [Palette, Zap, Code2];
              const Icon = iconComponents[i - 1];
              return (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5" />
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardTitle>{t(`playground.item${i}.title`)}</CardTitle>
                    <CardDescription>{t(`playground.item${i}.description`)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Badge variant="outline">{t(`playground.item${i}.tag1`)}</Badge>
                      <Badge variant="outline">{t(`playground.item${i}.tag2`)}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 text-left max-w-6xl mx-auto">
            <Link href={`/${locale}/lab`} className="sm:hidden">
                <Button variant="outline" className="group cursor-pointer">
                    {t('playground.viewAll')}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
          </div>
        </div>
      </section>
    </>
  );
}
