import { ElementType } from "react"

export type Project = {
    id: string
    title: string
    description: string
    icon: ElementType
    tags: string[]
  }