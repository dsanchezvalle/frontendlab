import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import Image from "next/image"
  import Link from "next/link"
  import { Calendar, Clock } from "lucide-react"
  import { cn } from "@/lib/utils"
  import React, { ElementType, ReactElement, SVGProps } from "react"
  
  type PreviewCardProps = {
    title: string
    description: string
    date?: string
    readTime?: string
    tags: string[]
    icon?: ReactElement<SVGProps<SVGSVGElement>>
    imageUrl?: string | null
    href: string
    className?: string
    titleAs?: ElementType // allows h2, h3, etc.
  }
  
  export function PreviewCard({
    title,
    description,
    date,
    readTime,
    tags,
    icon,
    imageUrl,
    href,
    className,
    titleAs = "h3", // default heading tag
  }: PreviewCardProps) {
    const validImageUrl = imageUrl?.trim() || undefined;
  
    return (
      <Link 
        href={href} 
        aria-label={`Read more about ${title}`}
        className={cn(
            "block rounded-xl",
            "transition-transform duration-200 hover:-translate-y-1",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
      >
        <Card
          className={cn(
            "group overflow-hidden cursor-pointer flex flex-col h-full",
            className
          )}
        >
          {validImageUrl && (
            <div className="relative w-full h-48">
              <Image
                src={validImageUrl} 
                alt={title}
                fill
                className="object-cover rounded-t-xl group-hover:scale-[1.02] transition-transform"
              />
            </div>
          )}
  
          <div className="flex flex-col grow">
            <CardHeader className="pb-4">
              {(date || readTime) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans mb-2">
                  {date && (
                    <>
                      <Calendar className="h-4 w-4" />
                      <span>{date}</span>
                    </>
                  )}
                  {date && readTime && <span>•</span>}
                  {readTime && (
                    <>
                      <Clock className="h-4 w-4" />
                      <span>{readTime}</span>
                    </>
                  )}
                </div>
              )}
  
              <div className="flex items-center gap-2">
              {icon && React.isValidElement<SVGProps<SVGSVGElement>>(icon) && (
                <span aria-hidden="true">
                    {React.cloneElement(icon, {
                    className: cn("h-7 w-7 text-primary", icon.props.className),
                    })}
                </span>
              )}
                <CardTitle as={titleAs} className="line-clamp-2 text-xl leading-tight font-sans group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
              </div>
            </CardHeader>
  
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed font-serif line-clamp-3 mb-4">
                {description}
              </CardDescription>
  
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }
  