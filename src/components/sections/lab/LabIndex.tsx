'use client'

import * as React from "react"
import { ArrowLeft } from "lucide-react"
import SearchInput from "@/components/shared/SearchInput"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type Project = {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: "1",
    title: "Interactive CSS Animations",
    description:
      "A collection of smooth CSS animations and transitions you can use in your projects. Includes hover effects, page transitions, and micro-interactions.",
    icon: "✨",
    tags: ["CSS", "Animation"],
  },
  {
    id: "2",
    title: "React Hook Experiments",
    description:
      "Custom React hooks for common use cases, tested and ready to use in your applications. Includes hooks for forms, animations, and API calls.",
    icon: "⚛️",
    tags: ["React", "Hooks"],
  },
  {
    id: "3",
    title: "Component Library Starter",
    description:
      "A minimal setup for building your own component library with TypeScript and Storybook. Includes configuration for testing and documentation.",
    icon: "📚",
    tags: ["TypeScript", "Storybook"],
  },
  {
    id: "4",
    title: "CSS Grid Playground",
    description:
      "Interactive examples of CSS Grid layouts with editable code. Experiment with different grid properties and see the results in real-time.",
    icon: "🧩",
    tags: ["CSS", "Layout"],
  },
  {
    id: "5",
    title: "SVG Animation Toolkit",
    description:
      "A collection of SVG animations and tools for creating engaging visual effects. Includes examples of path animations, morphing, and interactions.",
    icon: "🎭",
    tags: ["SVG", "Animation"],
  },
  {
    id: "6",
    title: "Accessible Form Components",
    description:
      "A set of form components built with accessibility in mind. Includes form validation, error handling, and keyboard navigation.",
    icon: "♿",
    tags: ["Accessibility", "UI"],
  },
  {
    id: "7",
    title: "State Management Patterns",
    description:
      "Examples of different state management patterns in React. Compare Redux, Context API, Zustand, and more with practical examples.",
    icon: "🔄",
    tags: ["React", "State"],
  },
  {
    id: "8",
    title: "Responsive Layout Templates",
    description:
      "A collection of responsive layout templates for common UI patterns. Includes navigation, cards, grids, and more.",
    icon: "📱",
    tags: ["CSS", "Responsive"],
  },
  {
    id: "9",
    title: "Web Animation API Examples",
    description:
      "Demonstrations of the Web Animation API for creating complex animations with JavaScript. Includes timeline-based animations and keyframes.",
    icon: "🎬",
    tags: ["JavaScript", "Animation"],
  },
]

export function LabIndex() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredProjects, setFilteredProjects] = React.useState(projects)

  React.useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredProjects(filtered)
  }, [searchQuery])

  return (
    <>
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-50 backdrop-blur">
        <div className="container flex mx-auto px-2 py-3">
          <div className="flex flex-col items-center sm:flex-row gap-4 w-full items-start">
          <div className="flex items-center gap-2">
            <Link href="/">
                <Button variant="ghost" size="icon" aria-label="Back to homepage" className="rounded-full cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
                <h1 className="text-2xl font-bold whitespace-nowrap">The Lab</h1>
          </div>
            <div className="max-w-2xl w-full">
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link href={project.id === "1" ? "/projects/1" : "#"} key={project.id}>
              <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" aria-hidden="true">
                      {project.icon}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs font-medium font-sans">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight font-sans">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed font-serif line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2 font-sans">No projects found</div>
            <p className="text-sm text-muted-foreground font-serif">
              Try adjusting your search terms or browse all projects
            </p>
          </div>
        )}
      </div>
    </>
  )
}
