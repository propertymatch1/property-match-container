import React from "react";
import { cn } from "~/lib/utils";

export interface IllustrationContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  maxWidth?: string;
  aspectRatio?: string;
}

export function IllustrationContainer({
  src,
  alt,
  maxWidth = "400px",
  aspectRatio = "1/1",
  className,
  style,
  ...props
}: IllustrationContainerProps) {
  return (
    <div
      className={cn("flex w-full items-center justify-center", className)}
      style={{
        maxWidth,
        aspectRatio,
        ...style,
      }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain [&_svg]:h-full [&_svg]:w-full"
        style={{
          color: "var(--color-primary)",
        }}
      />
    </div>
  );
}
