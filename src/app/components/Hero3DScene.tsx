"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import styles from "./Hero3DScene.module.css";

interface Hero3DSceneProps {
  scrollYProgress?: MotionValue<number>;
}

function hasVariable(api: Record<string, unknown>, name: string): boolean {
  try {
    if (typeof api.getVariable === "function") {
      (api.getVariable as Function)(name);
      return true;
    }
  } catch { /* does not exist */ }
  return false;
}

export default function Hero3DScene({ scrollYProgress }: Hero3DSceneProps) {
  const splineRef    = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded]     = useState(false);
  const [showScene, setShowScene]   = useState(false);
  const [hasError, setHasError]     = useState(false);
  const [isInView, setIsInView]     = useState(true);

  // Refs — never cause re-renders
  const varsChecked = useRef(false);
  const hasAnyVar   = useRef(false); 
  const hasMX       = useRef(false);
  const hasMY       = useRef(false);
  const hasSY       = useRef(false);
  const rawMouse    = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const lastSent    = useRef({ mx: -999, my: -999, sy: -999 });

  const onLoad = useCallback((app: Application) => {
    splineRef.current = app;
    setIsLoaded(true);
    // 200ms buffer: ensure Spline has actually painted the first frame before we reveal it
    setTimeout(() => setShowScene(true), 200);
  }, []);

  const onError = useCallback(() => setHasError(true), []);

  // Check which variables exist once after load
  useEffect(() => {
    if (!isLoaded || varsChecked.current) return;
    const api = splineRef.current as unknown as Record<string, unknown>;
    if (!api) return;
    hasMX.current = hasVariable(api, "mouseX");
    hasMY.current = hasVariable(api, "mouseY");
    hasSY.current = hasVariable(api, "scrollY");
    hasAnyVar.current = hasMX.current || hasMY.current || hasSY.current;
    varsChecked.current = true;
  }, [isLoaded]);

  // Track mouse — throttled to only update ref, no state
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      rawMouse.current = {
        x:  ((e.clientX - r.left) / r.width)  * 2 - 1,
        y: -((e.clientY - r.top)  / r.height) * 2 + 1,
      };
    };

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(container);

    container.addEventListener("mousemove", onMove, { passive: true });
    const blockWheel = (e: WheelEvent) => e.stopPropagation();
    container.addEventListener("wheel", blockWheel, { capture: true, passive: true });

    return () => {
      observer.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("wheel", blockWheel, { capture: true });
    };
  }, []);

  // RAF loop — optimization: only runs when visible and variables exist
  useEffect(() => {
    if (!isLoaded) return;

    const LERP = 0.12; 
    let rafId: number | null = null;

    const tick = () => {
      if (!isInView || document.visibilityState !== "visible") return;
      if (varsChecked.current && !hasAnyVar.current) return;

      smoothMouse.current.x += (rawMouse.current.x - smoothMouse.current.x) * LERP;
      smoothMouse.current.y += (rawMouse.current.y - smoothMouse.current.y) * LERP;

      if (varsChecked.current && hasAnyVar.current) {
        const api = splineRef.current as unknown as Record<string, unknown>;
        if (api && typeof api.setVariable === "function") {
          const set = api.setVariable as Function;
          try {
            if (hasMX.current && Math.abs(lastSent.current.mx - smoothMouse.current.x) > 0.002) {
              set("mouseX", smoothMouse.current.x);
              lastSent.current.mx = smoothMouse.current.x;
            }
            if (hasMY.current && Math.abs(lastSent.current.my - smoothMouse.current.y) > 0.002) {
              set("mouseY", smoothMouse.current.y);
              lastSent.current.my = smoothMouse.current.y;
            }
            if (hasSY.current) {
              const progress = scrollYProgress ? scrollYProgress.get() : 0;
              const clamped = Math.max(0, Math.min(1, progress));
              if (Math.abs(lastSent.current.sy - clamped) > 0.001) {
                set("scrollY", clamped);
                lastSent.current.sy = clamped;
              }
            }
          } catch {
            hasAnyVar.current = false;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    if (isInView) {
      rafId = requestAnimationFrame(tick);
    }

    return () => { 
      if (rafId !== null) cancelAnimationFrame(rafId); 
    };
  }, [isLoaded, isInView, scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className={styles.sceneWrapper}
      aria-hidden="true"
      style={{ 
        willChange: "transform",
        visibility: isInView ? "visible" : "hidden"
      }}
    >
      <AnimatePresence>
        {!showScene && !hasError && (
          <motion.div 
            key="loader"
            className={styles.loadOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className={styles.spotlightShimmer} />
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <div className={styles.fallback}>
          <span>✦</span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ 
            opacity: showScene ? 1 : 0, 
            scale: showScene ? 1 : 0.97 
          }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className={styles.splineCanvas}
        >
          <Spline
            scene="https://prod.spline.design/pwitNlNftLusscoe/scene.splinecode"
            onLoad={onLoad}
            onError={onError}
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
      )}
    </div>
  );
}
