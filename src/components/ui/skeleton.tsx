import { cn } from "~/lib/utils";

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "text" | "circular" | "rectangular";
}

function Skeleton({
  className,
  variant = "rectangular",
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse bg-[var(--color-neutral-200)]",
        "transition-opacity duration-[var(--duration-slow)] ease-[var(--easing-default)]",
        {
          "rounded-full": variant === "circular",
          "rounded-[var(--radius-sm)]": variant === "text",
          "rounded-[var(--radius-md)]": variant === "rectangular",
        },
        className,
      )}
      aria-busy="true"
      aria-live="polite"
      {...props}
    />
  );
}

export { Skeleton };
