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
      className={cn(
        "flex items-center justify-center w-full",
        className
      )}
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
        className="w-full h-full object-contain [&_svg]:w-full [&_svg]:h-full"
        style={{
          color: "var(--color-primary)",
        }}
      />
    </div>
  );
}
