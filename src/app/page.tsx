import { ThemeToggle } from '../components/shared/ThemeToggle';
import { LanguageSwitcher } from '../components/shared/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Code2, Palette, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
            <nav className="hidden md:flex items-center space-x-6 mr-4">
              <Link href="#articles" className="text-sm font-medium hover:text-primary transition-colors">
                Articles
              </Link>
              <Link href="#playground" className="text-sm font-medium hover:text-primary transition-colors">
                Playground
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
            </nav>
            <LanguageSwitcher/>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Build. Learn. Share <span className="text-primary font-mono">Frontend.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
                A space for developers to explore the latest frontend technologies, share knowledge, and experiment with frontend concepts and tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="font-medium">
                  Read Articles
                </Button>
                <Button size="lg" variant="outline" className="font-medium">
                  Explore Playground
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section id="articles" className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
              <p className="text-muted-foreground font-serif">
                Lessons learned, practical guides, and explorations around frontend development
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Dec 15, 2024</span>
                  </div>
                  <CardTitle className="line-clamp-2">Introduction to React Server Components</CardTitle>
                  <CardDescription>Exploring the new server-side rendering capabilities in React 18+</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Dec 10, 2024</span>
                  </div>
                  <CardTitle className="line-clamp-2">CSS Grid vs Flexbox: When to Use Each</CardTitle>
                  <CardDescription>A practical guide to choosing the right layout tool for the job</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">CSS</Badge>
                    <Badge variant="secondary">Layout</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Dec 5, 2024</span>
                  </div>
                  <CardTitle className="line-clamp-2">Performance Optimization in Vue 3 Applications</CardTitle>
                  <CardDescription>
                    Advanced techniques to improve the speed and efficiency of your Vue apps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Vue.js</Badge>
                    <Badge variant="secondary">Performance</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Project Playground Section */}
        <section id="playground" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Project Playground</h2>
              <p className="text-muted-foreground font-serif">Exploring ideas through experiments, demos, and interactive projects</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Palette className="h-8 w-8 text-primary" />
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle>CSS Variables Palette Generator</CardTitle>
                  <CardDescription>Interactive tool to create color palettes with custom CSS variables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline">CSS</Badge>
                    <Badge variant="outline">JavaScript</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Zap className="h-8 w-8 text-primary" />
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle>Framer Motion Animation Playground</CardTitle>
                  <CardDescription>Collection of reusable animations and transitions for React</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Framer Motion</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Code2 className="h-8 w-8 text-primary" />
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle>Live Code Editor</CardTitle>
                  <CardDescription>
                    Web-based editor with real-time preview for HTML, CSS, and JavaScript
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline">Monaco Editor</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4">
        <div className="mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1">
              <Code2 className="h-4 w-4" />
              <span className="font-mono font-medium">Frontendlab</span>
              <span className="text-xs sm:text-sm">
                by David Sánchez Valle. © {new Date().getFullYear()}.
              </span>
            </div>
            <nav className="flex gap-4 font-sans">
              <a
                href="https://github.com/dsanchezvalle"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dsanchezvalle/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:david@frontendlab.dev">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
