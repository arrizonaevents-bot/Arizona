"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import styles from "./Hero3DScene.module.css";

interface Hero3DSceneProps {}

function hasVariable(api: Record<string, unknown>, name: string): boolean {
  try {
    if (typeof api.getVariable === "function") {
      (api.getVariable as Function)(name);
      return true;
    }
  } catch { /* does not exist */ }
  return false;
}

export default function Hero3DScene({}: Hero3DSceneProps) {
  const splineRef    = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded]   = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [hasError, setHasError]   = useState(false);
  const [isInView, setIsInView]   = useState(true);

  // Checks if we are on the client to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Refs — never cause re-renders
  const varsChecked = useRef(false);
  const hasAnyVar   = useRef(false);
  const hasMX       = useRef(false);
  const hasMY       = useRef(false);
  const hasSY       = useRef(false);
  const rawMouse    = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const lastSent    = useRef({ mx: -999, my: -999, sy: -999 });

  const cachedRect = useRef<DOMRect | null>(null);

  const onLoad = useCallback((app: Application) => {
    splineRef.current = app;
    setIsLoaded(true);
    // Smoothly reveal the scene once loaded
    setShowScene(true);
  }, []);

  const onError = useCallback(() => setHasError(true), []);

  // Check variables once after load
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

  // Viewport and Interaction tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onEnter = () => {
      cachedRect.current = container.getBoundingClientRect();
    };
    const onMove = (e: MouseEvent) => {
      const r = cachedRect.current ?? container.getBoundingClientRect();
      rawMouse.current = {
        x:  ((e.clientX - r.left) / r.width)  * 2 - 1,
        y: -((e.clientY - r.top)  / r.height) * 2 + 1,
      };
    };
    const onResize = () => { cachedRect.current = null; };

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(container);

    container.addEventListener("mouseenter", onEnter, { passive: true });
    container.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const blockWheel = (e: WheelEvent) => e.stopPropagation();
    container.addEventListener("wheel", blockWheel, { capture: true, passive: true });

    return () => {
      observer.disconnect();
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mousemove",  onMove);
      container.removeEventListener("wheel", blockWheel, { capture: true });
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // RAF loop
  useEffect(() => {
    if (!isLoaded) return;

    const LERP = 0.12;
    let rafId: number | null = null;

    const tick = () => {
      if (!isInView) return;
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
          } catch {
            hasAnyVar.current = false;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (isInView && rafId === null) rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    };

    const onVisibilityChange = () => {
      document.hidden ? stop() : (isInView && start());
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isLoaded, isInView]);

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
      <AnimatePresence mode="wait">
        {!showScene && !hasError && (
          <motion.div
            key="loader"
            className={styles.loadOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: showScene ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={styles.splineCanvas}
        >
          {isClient && (
            <Spline
              scene="https://prod.spline.design/pwitNlNftLusscoe/scene.splinecode"
              onLoad={onLoad}
              onError={onError}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
