import mongoose from "mongoose";
import dotenv from "dotenv";
import Author from "@/models/Author";
import Tag from "@/models/Tag";
import Article from "@/models/Article";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function seed() {
  const isProduction = process.env.NODE_ENV === "production";
  const mongoUri = isProduction
    ? process.env.MONGODB_URI!
    : process.env.MONGODB_URI_DEV!;

  // Prevent accidental seeding on production
  if (isProduction) {
    console.error(
      "🚨 You are in PRODUCTION mode! Seeding is disabled to avoid data loss."
    );
    process.exit(1);
  }

  try {
    // Connect to the appropriate MongoDB database
    await mongoose.connect(mongoUri);
    console.log(`✅ Connected to MongoDB (${isProduction ? "PROD" : "DEV"})`);

    // Clear existing data in collections during development
    if (!isProduction) {
      await Author.deleteMany({});
      await Tag.deleteMany({});
      await Article.deleteMany({});
      console.log("🧹 Cleared authors, tags, and articles collections");
    }

    // Seed authors
    const authors = await Author.insertMany([
      {
        slug: "john-doe",
        name: "John Doe",
        email: "john@example.com",
        bio: {
          en: "Frontend developer passionate about design systems.",
          es: "Desarrollador frontend apasionado por los sistemas de diseño.",
          pt: "Desenvolvedor frontend apaixonado por sistemas de design.",
        },
        social: {
          twitter: "https://twitter.com/johndoe",
          github: "https://github.com/johndoe",
        },
      },
      {
        slug: "jane-smith",
        name: "Jane Smith",
        email: "jane@example.com",
        bio: {
          en: "UI engineer focused on accessibility and performance.",
          es: "Ingeniera de UI enfocada en accesibilidad y rendimiento.",
          pt: "Engenheira de UI focada em acessibilidade e performance.",
        },
        social: {
          twitter: "https://twitter.com/janesmith",
          github: "https://github.com/janesmith",
        },
      },
      {
        slug: "alex-oliveira",
        name: "Alex Oliveira",
        email: "alex@example.com",
        bio: {
          en: "Fullstack dev exploring the JAMstack and serverless.",
          es: "Desarrollador fullstack explorando JAMstack y serverless.",
          pt: "Dev fullstack explorando JAMstack e serverless.",
        },
        social: {
          twitter: "https://twitter.com/alexoliveira",
          github: "https://github.com/alexoliveira",
        },
      },
    ]);

    // Seed tags
    const tags = await Tag.insertMany([
      {
        key: "react",
        label: { en: "React", es: "React", pt: "React" },
        description: {
          en: "JavaScript library for building UIs",
          es: "Librería de JavaScript para interfaces",
          pt: "Biblioteca JavaScript para interfaces",
        },
      },
      {
        key: "accessibility",
        label: {
          en: "Accessibility",
          es: "Accesibilidad",
          pt: "Acessibilidade",
        },
        description: {
          en: "Inclusive web development practices",
          es: "Prácticas de desarrollo inclusivo",
          pt: "Práticas de desenvolvimento inclusivo",
        },
      },
    ]);

    // Seed articles
    await Article.insertMany([
      {
        slug: {
          en: "react-hooks-guide",
          es: "guia-react-hooks",
          pt: "guia-react-hooks",
        },
        title: {
          en: "Mastering React Hooks",
          es: "Domina los Hooks de React",
          pt: "Domine os Hooks do React",
        },
        description: {
          en: "A complete guide to using Hooks effectively.",
          es: "Una guía completa para usar Hooks.",
          pt: "Um guia completo para usar Hooks.",
        },
        content: {
          en: "## Intro\nReact Hooks changed everything...",
          es: "## Introducción\nLos React Hooks cambiaron todo...",
          pt: "## Introdução\nOs React Hooks mudaram tudo...",
        },
        coverImage: {
          url: "https://example.com/image.jpg",
          alt: {
            en: "React logo on a blue background",
            es: "Logo de React sobre un fondo azul",
            pt: "Logo do React em fundo azul",
          },
        },
        author: authors[0]._id,
        tags: [tags[0]._id],
        publishedAt: new Date(),
      },
      {
        slug: {
          en: "a11y-best-practices",
          es: "mejores-practicas-a11y",
          pt: "melhores-praticas-a11y",
        },
        title: {
          en: "Accessibility Best Practices",
          es: "Mejores prácticas de accesibilidad",
          pt: "Melhores práticas de acessibilidade",
        },
        description: {
          en: "Make your app inclusive for everyone.",
          es: "Haz que tu aplicación sea inclusiva para todos.",
          pt: "Torne seu app inclusivo para todos.",
        },
        content: {
          en: "## Why Accessibility Matters\nEveryone deserves to use the web...",
          es: "## Por qué importa la accesibilidad\nTodos merecen usar la web...",
          pt: "## Por que acessibilidade importa\nTodos merecem usar a web...",
        },
        author: authors[1]._id,
        tags: [tags[1]._id],
        publishedAt: new Date(),
      },
      {
        slug: {
          en: "react-suspense",
          es: "suspense-react",
          pt: "suspense-react",
        },
        title: {
          en: "React Suspense in Practice",
          es: "React Suspense en la práctica",
          pt: "React Suspense na prática",
        },
        description: {
          en: "Using Suspense for async rendering in modern apps.",
          es: "Uso de Suspense para renderizado asíncrono.",
          pt: "Uso do Suspense para renderização assíncrona.",
        },
        content: {
          en: "## What is Suspense?\nIt lets you wait for components...",
          es: "## ¿Qué es Suspense?\nPermite esperar componentes...",
          pt: "## O que é Suspense?\nPermite aguardar componentes...",
        },
        author: authors[0]._id,
        tags: [tags[0]._id],
        publishedAt: new Date(),
      },
      {
        slug: { en: "nextjs-mdx", es: "nextjs-mdx", pt: "nextjs-mdx" },
        title: {
          en: "Using MDX in Next.js",
          es: "Usando MDX en Next.js",
          pt: "Usando MDX no Next.js",
        },
        description: {
          en: "Blend Markdown and React in your blog.",
          es: "Combina Markdown y React en tu blog.",
          pt: "Misture Markdown e React no seu blog.",
        },
        content: {
          en: "## MDX = Markdown + JSX\nPerfect for content-driven apps...",
          es: "## MDX = Markdown + JSX\nPerfecto para apps con contenido...",
          pt: "## MDX = Markdown + JSX\nPerfeito para apps com conteúdo...",
        },
        author: authors[2]._id,
        tags: [tags[0]._id],
        publishedAt: new Date(),
      },
    ]);

    console.log("✅ Database seeded with authors, tags, and articles!");

    // Disconnect from MongoDB cleanly
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
