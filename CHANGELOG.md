## 2026-05-04

- fix(changelog): group entries by commit date instead of run date (#53)
- chore(changelog): update [skip ci]

## 2026-05-03

- fix(workflows): indent generate-changelog Python heredoc for YAML parser (#52)
- chore(workflow): install workflow-template alongside existing setup (#50)
- docs(agents): mention check-docs-sync and validate-release-pr workflows (#51)

## 2025-12-09

- fix(app): use Next 15 LayoutProps for [locale] layout

## 2025-12-08

- chore(log): align API and detail page with LogArticle and i18n Locale
- chore(security): bump Next.js and fix layout types for React2Shell
- refactor(log): use LogArticle DTOs in hooks, search, and index

## 2025-11-28

- feat(log): migrate Log feature to module architecture

## 2025-11-25

- refactor(log): move log types, hook and utils into modules/log with re-exports
- refactor(log): scaffold modules/log and migrate log components with proper re-exports

## 2025-11-24

- feat(log): add useArticles hook and integrate it into LogIndex to fetch articles from API
- fix(api): clean up unused request/searchParams in articles endpoint to resolve ESLint warnings
- refactor(api): migrate article routes to new db layer and improve handlers
- refactor(db): migrate mongoose connection and models to new db layer
- refactor(log): update mocks, cleanup types, and add localization utils

## 2025-11-21

- refactor: migrate LogIndex to useArticles hook and IArticle types

## 2025-07-24

- chore: update URL parser in api/articles/[slug]/route.ts

## 2025-07-23

- feat: update nextjs version to 15.4.3
- fix: update mongoose.ts and api/articles/[slug]/route.ts to solve typing issues

## 2025-07-22

- feat: add GET /articles route with populated author and tags
- feat: implement GET /articles/[slug] with language support and populated refs
- fix: fix minor lint issues
- fix: minor fix in Article model
- fix: remove publishedAt from seed script
- refactor: optimize mongoose connection handling with global cache

## 2025-07-21

- feat: create seed script for development environment and test purposes
- feat: install cross-env, tsx and dotenv and create seed script
- feat: update lib/mongoose.ts to switch prod and dev MongoDB URIs

## 2025-07-19

- feat: add Article, Author, and Tag schemas with i18n support and references

## 2025-07-17

- feat: MongoDB connection setup
- feat: mongoose installation

## 2025-07-14

- chore: fix missing space between title and highlight in Hero section
- chore: update labels and translations for homepage navigation buttons
- chore: update logo link to include the dynamic locale
- chore: update names for articles and experiments
- chore: update navigation buttons and links from homepage
- chore: update translations for The Log and The Lab new names

## 2025-07-01

- feat: create PreviewCard component
- feat: update mockProjects with lucide-react icons
- feat: update Project types
- feat: use PreviewCard component in home page, LogIndex and LabIndex
- refactor: update CardTitle to support custom elements via `as` prop

## 2025-06-22

- feat: create CardGrid, EmptyState, and SkeletonCard components
- feat: create custom hooks to handle search and fetch logic
- feat: create Project type and mockProjects as separate files
- feat: create StickyTopSearchBar
- feat: implement the new subcomponents in LogIndex
- feat: implement the new subcomponents is LabIndex

## 2025-06-21

- feat: create LogPost type and mockLogPosts as separate files

## 2025-06-18

- feat: create article detail subcomponents

## 2025-06-17

- feat: add create slug function
- feat: create first version of article detail layout
- feat: install tailwind/typography plugin

## 2025-06-16

- feat: update README.md

## 2025-06-14

- feat: update reame file

## 2025-06-12

- feat: create index page for The Log section

## 2025-06-11

- feat: create log index page
- feat: create LogIndex page and its subcomponents
- feat: update home page and layout
- feat: update translation messages

## 2025-06-09

- feat: create page.tsx for LabPage and ArticlesPage
- feat: update Home page.tsx removing header and footer
- feat: update layout.tsx including header, footer and main
- feat: update messages for en, es, and pt

## 2025-06-06

- feat: add messages json files for en, es, pt locales
- feat: install next-intl
- feat: refactor LanguageSwitcher.tsx to use next-intl
- feat: restructure folder organization
- feat: set up middleware.ts using routing config
- feat: set up navigation APIs in navigation.ts
- feat: set up next intl plugin in next.config.ts
- feat: set up request.ts to provide messages an other options based on the locale
- feat: set up routing.ts
- feat: update Home page structure use useTranslations
- feat: use locale via params and pass config to client components via NextIntlClientProvider
- fix: adjust text wrapping for spanish in header nav

## 2025-05-30

- feat: add dropwdown component
- feat: create LanguageSwitcher component UI

## 2025-05-29

- feat: add Jetbrains Mono font to layout.tsx
- feat: add new favicon
- feat: update font and color tokens in globals.css
- feat: update page layout and content

## 2025-05-20

- fix(theme-toggle): prevent first click bug in theme toggle component

## 2025-05-19

- feat: add shadcn Button
- feat: create and include next-themes ThemeProvider
- feat: create and include ThemeToggle
- feat: install next-themes
- feat: install shadcn
- feat: update globals.css with shadcn installation and add background gradient colors

## 2025-05-16

- feat: update email address with new domain

## 2025-05-15

- feat: add dmSans and lora google fonts
- feat: update Home page with coming soon message and footer
- feat: update Home page with coming soon message and footer

## 2025-05-13

- feat: update metadata description and title for SEO and clarity

