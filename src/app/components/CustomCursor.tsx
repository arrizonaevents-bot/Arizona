"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // Use raw motion values to bypass React render cycle completely
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    const canUseCustomCursor =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUseCustomCursor) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand cursor over interactive elements
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('card-3d') ||
        target.closest('.card-3d')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "10px",
          height: "10px",
          backgroundColor: isHovering ? "transparent" : "var(--color-gold)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
          x: mouseX,
          y: mouseY
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: isHovering ? "1.5px solid rgba(212, 175, 55, 0.8)" : "1.2px solid rgba(212, 175, 55, 0.3)",
          backgroundColor: "transparent",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          translateX: "-50%",
          translateY: "-50%",
          x: smoothX,
          y: smoothY
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}
