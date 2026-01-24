"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

interface Connection {
  from: string;
  to: string;
}

const NODES: Node[] = [
  // Core nodes (brightest)
  { id: "center", x: 50, y: 50, size: 32, color: "#6b7c6e", opacity: 1 },
  { id: "top", x: 48, y: 15, size: 22, color: "#d4a574", opacity: 0.95 },
  { id: "right", x: 85, y: 48, size: 24, color: "#7d8f81", opacity: 0.95 },
  { id: "bottom", x: 52, y: 85, size: 20, color: "#c4956a", opacity: 0.95 },
  { id: "left", x: 15, y: 52, size: 22, color: "#a3b1a6", opacity: 0.95 },
  
  // Secondary ring
  { id: "topRight", x: 75, y: 20, size: 16, color: "#c7d0c9", opacity: 0.85 },
  { id: "bottomRight", x: 80, y: 75, size: 17, color: "#e4c5a4", opacity: 0.85 },
  { id: "bottomLeft", x: 22, y: 78, size: 15, color: "#7d8f81", opacity: 0.85 },
  { id: "topLeft", x: 20, y: 25, size: 16, color: "#d4a574", opacity: 0.85 },
  
  // Inner nodes
  { id: "innerTop", x: 50, y: 32, size: 12, color: "#e4c5a4", opacity: 0.8 },
  { id: "innerRight", x: 68, y: 50, size: 11, color: "#a3b1a6", opacity: 0.8 },
  { id: "innerBottom", x: 50, y: 68, size: 10, color: "#c7d0c9", opacity: 0.8 },
  { id: "innerLeft", x: 32, y: 50, size: 11, color: "#d4a574", opacity: 0.8 },
  
  // Mid-distance nodes
  { id: "midTopRight", x: 65, y: 28, size: 13, color: "#c4956a", opacity: 0.75 },
  { id: "midBottomLeft", x: 35, y: 72, size: 12, color: "#7d8f81", opacity: 0.75 },
  { id: "midTopLeft", x: 35, y: 28, size: 11, color: "#a3b1a6", opacity: 0.75 },
  { id: "midBottomRight", x: 65, y: 72, size: 12, color: "#e4c5a4", opacity: 0.75 },
  
  // Outer ring (fading)
  { id: "farTop", x: 35, y: 5, size: 10, color: "#a3b1a6", opacity: 0.5 },
  { id: "farTopRight", x: 92, y: 25, size: 9, color: "#d4a574", opacity: 0.45 },
  { id: "farRight", x: 95, y: 55, size: 8, color: "#d4a574", opacity: 0.4 },
  { id: "farBottomRight", x: 90, y: 88, size: 9, color: "#c7d0c9", opacity: 0.45 },
  { id: "farBottom", x: 60, y: 95, size: 10, color: "#c7d0c9", opacity: 0.5 },
  { id: "farBottomLeft", x: 10, y: 90, size: 8, color: "#6b7c6e", opacity: 0.4 },
  { id: "farLeft", x: 5, y: 45, size: 9, color: "#6b7c6e", opacity: 0.45 },
  { id: "farTopLeft", x: 8, y: 12, size: 8, color: "#7d8f81", opacity: 0.4 },
  
  // Edge particles (very faded)
  { id: "edge1", x: 65, y: 5, size: 6, color: "#c4956a", opacity: 0.3 },
  { id: "edge2", x: 98, y: 38, size: 5, color: "#a3b1a6", opacity: 0.25 },
  { id: "edge3", x: 95, y: 72, size: 6, color: "#7d8f81", opacity: 0.3 },
  { id: "edge4", x: 78, y: 95, size: 5, color: "#d4a574", opacity: 0.25 },
  { id: "edge5", x: 25, y: 95, size: 6, color: "#e4c5a4", opacity: 0.3 },
  { id: "edge6", x: 3, y: 70, size: 5, color: "#c7d0c9", opacity: 0.25 },
  { id: "edge7", x: 3, y: 28, size: 6, color: "#c4956a", opacity: 0.3 },
  { id: "edge8", x: 18, y: 3, size: 5, color: "#a3b1a6", opacity: 0.25 },
  { id: "edge9", x: 82, y: 8, size: 5, color: "#7d8f81", opacity: 0.28 },
  { id: "edge10", x: 42, y: 98, size: 5, color: "#6b7c6e", opacity: 0.25 },
];

const CONNECTIONS: Connection[] = [
  // Core connections
  { from: "center", to: "top" },
  { from: "center", to: "right" },
  { from: "center", to: "bottom" },
  { from: "center", to: "left" },
  { from: "center", to: "innerTop" },
  { from: "center", to: "innerRight" },
  { from: "center", to: "innerBottom" },
  { from: "center", to: "innerLeft" },
  
  // Secondary ring
  { from: "top", to: "topRight" },
  { from: "topRight", to: "right" },
  { from: "right", to: "bottomRight" },
  { from: "bottomRight", to: "bottom" },
  { from: "bottom", to: "bottomLeft" },
  { from: "bottomLeft", to: "left" },
  { from: "left", to: "topLeft" },
  { from: "topLeft", to: "top" },
  
  // Inner to mid
  { from: "innerTop", to: "midTopRight" },
  { from: "innerTop", to: "midTopLeft" },
  { from: "innerBottom", to: "midBottomRight" },
  { from: "innerBottom", to: "midBottomLeft" },
  
  // Mid connections
  { from: "midTopRight", to: "topRight" },
  { from: "midBottomLeft", to: "bottomLeft" },
  { from: "midTopLeft", to: "topLeft" },
  { from: "midBottomRight", to: "bottomRight" },
  
  // To outer ring
  { from: "top", to: "farTop" },
  { from: "topRight", to: "farTopRight" },
  { from: "right", to: "farRight" },
  { from: "bottomRight", to: "farBottomRight" },
  { from: "bottom", to: "farBottom" },
  { from: "bottomLeft", to: "farBottomLeft" },
  { from: "left", to: "farLeft" },
  { from: "topLeft", to: "farTopLeft" },
  
  // Edge connections
  { from: "farTop", to: "edge1" },
  { from: "farTopRight", to: "edge9" },
  { from: "farRight", to: "edge2" },
  { from: "farRight", to: "edge3" },
  { from: "farBottomRight", to: "edge4" },
  { from: "farBottom", to: "edge10" },
  { from: "farBottomLeft", to: "edge5" },
  { from: "farLeft", to: "edge6" },
  { from: "farTopLeft", to: "edge7" },
  { from: "farTopLeft", to: "edge8" },
];

const toCoord = (percent: number) => percent * 4.8;

export function SciFiConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animations: gsap.core.Tween[] = [];

    // Gentle pulse for nodes
    NODES.forEach((node, i) => {
      const nodeEl = svg.querySelector(`[data-node="${node.id}"]`);
      if (nodeEl) {
        animations.push(gsap.to(nodeEl, {
          scale: 1.1,
          duration: 2.5 + (i % 5) * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: (i % 8) * 0.15
        }));
      }
    });

    // Cursor reactivity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 480;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 480;

      NODES.forEach((node) => {
        const nodeEl = svg.querySelector(`[data-node="${node.id}"]`) as SVGCircleElement;
        if (!nodeEl) return;

        const cx = toCoord(node.x);
        const cy = toCoord(node.y);
        const dist = Math.hypot(mouseX - cx, mouseY - cy);
        const maxDist = 120;

        if (dist < maxDist) {
          const strength = 1 - dist / maxDist;
          gsap.to(nodeEl, {
            scale: 1 + strength * 0.5,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });
    };

    const handleMouseLeave = () => {
      NODES.forEach((node) => {
        const nodeEl = svg.querySelector(`[data-node="${node.id}"]`);
        if (nodeEl) {
          gsap.to(nodeEl, { scale: 1, duration: 0.4, ease: "power2.out" });
        }
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      animations.forEach(a => a.kill());
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[480px]" aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 480 480" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {CONNECTIONS.map((conn) => {
          const from = NODES.find(n => n.id === conn.from);
          const to = NODES.find(n => n.id === conn.to);
          if (!from || !to) return null;
          const avgOpacity = (from.opacity + to.opacity) / 2 * 0.4;
          return (
            <line
              key={`${conn.from}-${conn.to}`}
              x1={toCoord(from.x)}
              y1={toCoord(from.y)}
              x2={toCoord(to.x)}
              y2={toCoord(to.y)}
              stroke="#8a9a8d"
              strokeWidth="1"
              opacity={avgOpacity}
            />
          );
        })}

        {NODES.map((node) => {
          const cx = toCoord(node.x);
          const cy = toCoord(node.y);
          return (
            <g key={node.id}>
              <circle cx={cx} cy={cy} r={node.size * 1.6} fill={node.color} opacity={node.opacity * 0.12}/>
              <circle
                data-node={node.id}
                cx={cx}
                cy={cy}
                r={node.size}
                fill={node.color}
                opacity={node.opacity}
                filter="url(#glow)"
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
              <circle cx={cx - node.size * 0.2} cy={cy - node.size * 0.2} r={node.size * 0.2} fill="white" opacity={node.opacity * 0.2}/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
