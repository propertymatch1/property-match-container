import * as React from "react";

import { cn } from "~/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, error, helperText, id: providedId, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = providedId || generatedId;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="label-text mb-2 block text-[var(--color-text)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={inputId}
          data-slot="input"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          className={cn(
            // Base styles with design tokens
            "h-9 w-full min-w-0 bg-transparent px-3 py-1 text-base outline-none md:text-sm",
            "rounded-[var(--radius-md)] border border-[var(--color-border)]",
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
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            // File input styles
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            // Selection styles
            "selection:bg-[var(--color-primary)] selection:text-white",
            className,
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
    );
  },
);

Input.displayName = "Input";

export { Input };
