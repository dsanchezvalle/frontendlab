import {
  Zap,
  Code2,
  BookOpenCheck,
  Accessibility,
  Grid3X3,
  Wand2,
  LayoutTemplate,
  Video,
} from "lucide-react";
import type { LabExperiment } from "@/types";

export const mockExperiments: LabExperiment[] = [
  {
    id: "1",
    title: "Interactive CSS Animations",
    description:
      "A collection of smooth CSS animations and transitions you can use in your projects. Includes hover effects, page transitions, and micro-interactions.",
    icon: Wand2,
    tags: ["CSS", "Animation"],
  },
  {
    id: "2",
    title: "React Hook Experiments",
    description:
      "Custom React hooks for common use cases, tested and ready to use in your applications. Includes hooks for forms, animations, and API calls.",
    icon: Zap,
    tags: ["React", "Hooks"],
  },
  {
    id: "3",
    title: "Component Library Starter",
    description:
      "A minimal setup for building your own component library with TypeScript and Storybook. Includes configuration for testing and documentation.",
    icon: BookOpenCheck,
    tags: ["TypeScript", "Storybook"],
  },
  {
    id: "4",
    title: "CSS Grid Playground",
    description:
      "Interactive examples of CSS Grid layouts with editable code. Experiment with different grid properties and see the results in real-time.",
    icon: Grid3X3,
    tags: ["CSS", "Layout"],
  },
  {
    id: "5",
    title: "SVG Animation Toolkit",
    description:
      "A collection of SVG animations and tools for creating engaging visual effects. Includes examples of path animations, morphing, and interactions.",
    icon: Video,
    tags: ["SVG", "Animation"],
  },
  {
    id: "6",
    title: "Accessible Form Components",
    description:
      "A set of form components built with accessibility in mind. Includes form validation, error handling, and keyboard navigation.",
    icon: Accessibility,
    tags: ["Accessibility", "UI"],
  },
  {
    id: "7",
    title: "State Management Patterns",
    description:
      "Examples of different state management patterns in React. Compare Redux, Context API, Zustand, and more with practical examples.",
    icon: Zap,
    tags: ["React", "State"],
  },
  {
    id: "8",
    title: "Responsive Layout Templates",
    description:
      "A collection of responsive layout templates for common UI patterns. Includes navigation, cards, grids, and more.",
    icon: LayoutTemplate,
    tags: ["CSS", "Responsive"],
  },
  {
    id: "9",
    title: "Web Animation API Examples",
    description:
      "Demonstrations of the Web Animation API for creating complex animations with JavaScript. Includes timeline-based animations and keyframes.",
    icon: Code2,
    tags: ["JavaScript", "Animation"],
  },
];
