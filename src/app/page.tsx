export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background bg-gradient-to-b from-gray-900 via-black to-gray-900 text-foreground text-foreground font-[family-name:var(--font-dm-sans)]">
      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          Coming soon...
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-md font-[family-name:var(--font-lora)]">
          We're building something great. Stay tuned!
        </p>
      </main>
      {/* Footer */}
      <footer className="w-full border-gray-200 py-4 text-sm text-gray-500 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-full mx-auto gap-2 px-4">
          <span>© {new Date().getFullYear()} David Sánchez Valle. All rights reserved.</span>
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
            <a
              href="mailto:dsanva2004@gmail.com"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
