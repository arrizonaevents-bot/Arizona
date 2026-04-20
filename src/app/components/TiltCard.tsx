"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  // Use MotionValues for smooth spring physics rather than raw state updates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const glareX        = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY        = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity  = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.3, 0, 0.3]);

  // ─── Cached rect: read once on mouseenter, not every pixel of movement ───
  const cachedRect  = useRef<DOMRect | null>(null);
  // Track hover state in a ref to avoid re-renders — use motionValue for glare
  const isHoveringMV = useMotionValue(0);
  const glareVisible  = useTransform(isHoveringMV, [0, 1], [0, 1]);

  const handleMouseEnter = () => {
    if (ref.current) cachedRect.current = ref.current.getBoundingClientRect();
    isHoveringMV.set(1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cachedRect.current;
    if (!rect) return;

    const xPct = (e.clientX - rect.left) / rect.width  - 0.5;
    const yPct = (e.clientY - rect.top)  / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    cachedRect.current = null;
    isHoveringMV.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        perspective: 1200,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Glare internal layer — driven purely by MotionValues, no React re-renders */}
      <motion.div
        style={{
          position: "absolute",
          right: 0, bottom: 0,
          background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 60%)`,
          opacity: glareOpacity,
          left: glareX,
          top: glareY,
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
          pointerEvents: "none",
          zIndex: 10,
          mixBlendMode: "overlay",
          visibility: glareVisible.get() > 0 ? "visible" : "hidden",
        }}
        animate={{ opacity: undefined }}
      />
      {children}
    </motion.div>
  );
}
