import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href: string
  label?: string
}

export default function BackButton({ href, label = "Back" }: BackButtonProps) {
  return (
      <Link href={href}>
        <Button variant="ghost" size="sm" className="group font-sans cursor-pointer">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {label}
        </Button>
      </Link>
  )
}
