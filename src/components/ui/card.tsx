import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const cardVariants = cva(
  "flex flex-col bg-[var(--color-background)] text-[var(--color-text)] rounded-[var(--radius-lg)] transition-all duration-[var(--duration-normal)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
  {
    variants: {
      variant: {
        default: "border border-[var(--color-border)] shadow-[var(--shadow-sm)]",
        outlined: "border-2 border-[var(--color-border)]",
        elevated: "shadow-[var(--shadow-md)] border-0",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-primary)] transition-all duration-[var(--duration-normal)]",
        false: "",
      },
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
      orientation: "vertical",
    },
  }
)

function Card({ 
  className, 
  variant,
  interactive,
  orientation,
  ...props 
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant, interactive, orientation }),
        "gap-[var(--spacing-6)] p-[var(--spacing-6)]",
        className
      )}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-[var(--spacing-2)] px-[var(--spacing-6)] has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-[var(--spacing-6)]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-[var(--spacing-6)]", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-[var(--spacing-6)] [.border-t]:pt-[var(--spacing-6)]", className)}
      {...props}
    />
  )
}

interface FeatureCardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {
  icon?: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  variant,
  interactive,
  orientation,
  className,
  ...props 
}: FeatureCardProps) {
  return (
    <Card 
      variant={variant} 
      interactive={interactive}
      orientation={orientation}
      className={className}
      {...props}
    >
      {icon && (
        <div 
          className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-teal-50)] text-[var(--color-primary)]"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-[var(--spacing-2)]">
        <CardTitle className="text-[var(--font-size-lg)] font-[var(--font-weight-semibold)]">
          {title}
        </CardTitle>
        <CardDescription className="text-[var(--font-size-base)] text-[var(--color-text-muted)]">
          {description}
        </CardDescription>
      </div>
    </Card>
  )
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  FeatureCard,
}
