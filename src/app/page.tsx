import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  return (
    <div className="gradient-background text-foreground font-[family-name:var(--font-dm-sans)] min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full h-16 px-5 flex items-center justify-end">
        <ThemeToggle />
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          Coming soon...
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-md font-[family-name:var(--font-lora)]">
          We&apos;re building something great. Stay tuned!
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-sm text-gray-500 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-full mx-auto gap-2 px-4">
          <span>© {new Date().getFullYear()} Frontend Lab by David Sánchez Valle</span>
          <div className="flex gap-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
