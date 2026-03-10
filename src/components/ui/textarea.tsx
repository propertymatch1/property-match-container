import * as React from "react"

import { cn } from "~/lib/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string
  error?: string
  helperText?: string
  rows?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id: providedId, rows = 4, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = providedId || generatedId
    const errorId = `${textareaId}-error`
    const helperTextId = `${textareaId}-helper`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="label-text mb-2 block text-[var(--color-text)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          data-slot="textarea"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          className={cn(
            // Base styles with design tokens
            "min-h-16 w-full bg-transparent px-3 py-2 text-base outline-none md:text-sm",
            "border border-[var(--color-border)] rounded-[var(--radius-md)]",
            "shadow-[var(--shadow-sm)]",
            "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--easing-default)]",
            // Placeholder with WCAG AA contrast
            "placeholder:text-[var(--color-text-muted)]",
            // Focus state with teal accent
            "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20",
            // Error state
            error &&
              "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20",
            // Disabled state with reduced opacity
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
            // Selection styles
            "selection:bg-[var(--color-primary)] selection:text-white",
            // Resize behavior
            "resize-y",
            className
          )}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className="caption-text mt-1 text-[var(--color-error)]"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperTextId} className="caption-text mt-1">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
