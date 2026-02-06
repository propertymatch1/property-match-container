"use client";

import * as React from "react";
import { ChevronDown, ArrowDown, Dot } from "lucide-react";
import { cn } from "~/lib/utils";

interface VisualConnectorProps {
  type?: 'divider' | 'flow' | 'connector';
  className?: string;
  icon?: 'chevron' | 'arrow' | 'dot' | 'none';
  label?: string;
}

/**
 * VisualConnector creates visual flow between card sections using
 * subtle lines, gradients, and optional icons.
 */
export default function VisualConnector({
  type = 'divider',
  className,
  icon = 'none',
  label,
}: VisualConnectorProps) {
  const renderIcon = () => {
    if (icon === 'none') return null;
    
    const iconProps = {
      size: 16,
      className: "flow-indicator-icon"
    };
    
    switch (icon) {
      case 'chevron':
        return <ChevronDown {...iconProps} />;
      case 'arrow':
        return <ArrowDown {...iconProps} />;
      case 'dot':
        return <Dot {...iconProps} />;
      default:
        return null;
    }
  };

  if (type === 'divider') {
    return (
      <div className={cn("section-divider decorative-desktop-only", className)} />
    );
  }

  if (type === 'flow') {
    return (
      <div className={cn("flow-indicator decorative-desktop-only", className)}>
        {renderIcon()}
        {label && (
          <span className="flow-indicator-icon text-xs font-medium">
            {label}
          </span>
        )}
      </div>
    );
  }

  if (type === 'connector') {
    return (
      <div className={cn("visual-connector decorative-desktop-only", className)} />
    );
  }

  return null;
}

export { VisualConnector };