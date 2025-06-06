import { ThemeToggle } from '../../components/shared/ThemeToggle';
import { LanguageSwitcher } from '../../components/shared/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Code2, Palette, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen gradient-background backdrop-blur bg-background/70">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="container flex items-center space-x-2 grow">
            <Code2 className="h-6 w-6" />
            <span className="font-mono font-bold text-lg">Frontendlab</span>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-4 flex-shrink-0 mr-4"> 
              <Link href="#articles" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
                {t('nav.articles')}
              </Link>
              <Link href="#playground" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
                {t('nav.playground')}
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
                {t('nav.about')}
              </Link>
            </nav>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
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

        {/* Articles */}
        <section id="articles" className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('articles.title')}</h2>
              <p className="text-muted-foreground font-serif">{t('articles.description')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{t('articles.item1.date')}</span>
                  </div>
                  <CardTitle>{t('articles.item1.title')}</CardTitle>
                  <CardDescription>{t('articles.item1.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{t('articles.item1.tag1')}</Badge>
                    <Badge variant="secondary">{t('articles.item1.tag2')}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{t('articles.item2.date')}</span>
                  </div>
                  <CardTitle>{t('articles.item2.title')}</CardTitle>
                  <CardDescription>{t('articles.item2.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{t('articles.item2.tag1')}</Badge>
                    <Badge variant="secondary">{t('articles.item2.tag2')}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{t('articles.item3.date')}</span>
                  </div>
                  <CardTitle>{t('articles.item3.title')}</CardTitle>
                  <CardDescription>{t('articles.item3.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{t('articles.item3.tag1')}</Badge>
                    <Badge variant="secondary">{t('articles.item3.tag2')}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Playground */}
        <section id="playground" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('playground.title')}</h2>
              <p className="text-muted-foreground font-serif">{t('playground.description')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Palette className="h-8 w-8 text-primary" />
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle>{t('playground.item1.title')}</CardTitle>
                  <CardDescription>{t('playground.item1.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline">{t('playground.item1.tag1')}</Badge>
                    <Badge variant="outline">{t('playground.item1.tag2')}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Zap className="h-8 w-8 text-primary" />
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle>{t('playground.item2.title')}</CardTitle>
                  <CardDescription>{t('playground.item2.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline">{t('playground.item2.tag1')}</Badge>
                    <Badge variant="outline">{t('playground.item2.tag2')}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Code2 className="h-8 w-8 text-primary" />
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle>{t('playground.item3.title')}</CardTitle>
                  <CardDescription>{t('playground.item3.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline">{t('playground.item3.tag1')}</Badge>
                    <Badge variant="outline">{t('playground.item3.tag2')}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-4">
        <div className="mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1">
              <Code2 className="h-4 w-4" />
              <span className="font-mono font-medium">Frontendlab</span>
              <span className="text-xs sm:text-sm">{t('footer.author')} © {new Date().getFullYear()}.</span>
            </div>
            <nav className="flex gap-4 font-sans">
              <a href="https://github.com/dsanchezvalle" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/dsanchezvalle/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:david@frontendlab.dev">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
