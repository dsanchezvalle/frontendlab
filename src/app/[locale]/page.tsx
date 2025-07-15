import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Palette, Zap } from "lucide-react";
import Link from "next/link";
import { mockArticles } from "@/components/sections/log/mocks";
import { mockExperiments } from "@/components/sections/lab/mocks";
import { PreviewCard } from "@/components/shared/PreviewCard";

import { getTranslations, getLocale } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t("hero.title")}{" "}
              <span className="text-primary font-mono">
                {t("hero.highlight")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/log`}>
                <Button size="lg" className="font-medium cursor-pointer">
                  {t("hero.cta.articles")}
                </Button>
              </Link>
              <Link href={`/${locale}/lab`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-medium cursor-pointer"
                >
                  {t("hero.cta.experiments")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Log */}
      <section id="articles" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-3 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold">{t("articles.title")}</h2>
            <Link href={`/${locale}/log`} className="flex items-center gap-2">
              <Button variant="outline" className="group cursor-pointer">
                {t("articles.viewAll")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground font-serif mb-8 max-w-6xl mx-auto">
            {t("articles.description")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mockArticles.slice(0, 3).map((article) => (
              <PreviewCard
                key={article.id}
                title={article.title}
                description={article.description}
                date={article.date}
                readTime={article.readTime}
                tags={article.tags}
                href={`/${locale}/log/${article.id}-${article.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              />
            ))}
          </div>
          <div className="mt-8 text-left max-w-6xl mx-auto">
            <Link href={`/${locale}/log`} className="sm:hidden">
              <Button variant="outline" className="group cursor-pointer">
                {t("articles.viewAll")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Lab */}
      <section id="playground" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-3 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold">{t("playground.title")}</h2>
            <Link href={`/${locale}/lab`} className="flex items-center gap-2">
              <Button variant="outline" className="group cursor-pointer">
                {t("playground.viewAll")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground font-serif mb-8 max-w-6xl mx-auto">
            {t("playground.description")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mockExperiments.slice(0, 3).map((experiment, i) => {
              const Icon = [Palette, Zap, Code2][i];

              return (
                <PreviewCard
                  key={experiment.id}
                  title={experiment.title}
                  description={experiment.description}
                  tags={experiment.tags}
                  icon={<Icon />}
                  href={`/${locale}/lab/${experiment.id}-${experiment.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                />
              );
            })}
          </div>
          <div className="mt-8 text-left max-w-6xl mx-auto">
            <Link href={`/${locale}/lab`} className="sm:hidden">
              <Button variant="outline" className="group cursor-pointer">
                {t("playground.viewAll")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
