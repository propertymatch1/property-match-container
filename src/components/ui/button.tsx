import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] transition-colors duration-[var(--duration-fast)]",
        secondary:
          "bg-transparent border-2 border-[var(--color-border)] text-[var(--color-text)] rounded-[var(--radius-md)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-[var(--duration-fast)]",
        text:
          "bg-transparent text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-[var(--duration-fast)]",
        destructive:
          "bg-[var(--color-error)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-error)]/90 transition-colors duration-[var(--duration-fast)]",
      },
      size: {
        sm: "h-10 px-4 py-2 text-[var(--font-size-sm)] min-h-[44px] min-w-[44px]",
        md: "h-11 px-6 py-3 text-[var(--font-size-base)] min-h-[44px] min-w-[44px]",
        lg: "h-12 px-8 py-3 text-[var(--font-size-lg)] min-h-[44px] min-w-[44px]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  "aria-label": ariaLabel,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  
  // Check if button is icon-only (no text children)
  const isIconOnly = React.Children.toArray(children).every(
    (child) => React.isValidElement(child) && typeof child.type !== "string"
  )
  
  // Warn if icon-only button lacks aria-label
  if (isIconOnly && !ariaLabel && !props["aria-labelledby"]) {
    console.warn("Icon-only buttons should have an aria-label for accessibility")
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Comp>
  )
}
export { Button, buttonVariants }
