"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import type { MotionValue } from "framer-motion";
import styles from "./Hero3DScene.module.css";

interface Hero3DSceneProps {
  /** Scroll progress passed in from parent framer-motion useScroll */
  scrollYProgress?: MotionValue<number>;
}

// Check once whether a Spline app has a named variable
function hasVariable(api: Record<string, unknown>, name: string): boolean {
  try {
    if (typeof api.getVariable === "function") {
      (api.getVariable as Function)(name);
      return true;
    }
  } catch {
    /* variable does not exist in this .spline file */
  }
  return false;
}

export default function Hero3DScene({ scrollYProgress }: Hero3DSceneProps) {
  const splineRef    = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Track which Spline variables actually exist so we never spam warnings
  const varsChecked  = useRef(false);
  const hasMX        = useRef(false);
  const hasMY        = useRef(false);
  const hasSY        = useRef(false);

  // Live mouse position (raw → smoothed)
  const rawMouse    = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const lastSent    = useRef({ mx: -999, my: -999, sy: -999 });
  const rafRef      = useRef<number | null>(null);

  // ── Store app on load ──────────────────────────────────────────────
  const onLoad = useCallback((app: Application) => {
    splineRef.current = app;
    setIsLoaded(true);
  }, []);

  const onError = useCallback(() => setHasError(true), []);

  // ── Detect available variables once, right after load ─────────────
  useEffect(() => {
    if (!isLoaded || varsChecked.current) return;
    const api = splineRef.current as unknown as Record<string, unknown>;
    if (!api) return;

    hasMX.current = hasVariable(api, "mouseX");
    hasMY.current = hasVariable(api, "mouseY");
    hasSY.current = hasVariable(api, "scrollY");
    varsChecked.current = true;
  }, [isLoaded]);

  // ── Track mouse (normalised –1…+1) ───────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      rawMouse.current = {
        x:  ((e.clientX - r.left)  / r.width)  * 2 - 1,
        y: -((e.clientY - r.top)   / r.height)  * 2 + 1,
      };
    };

    container.addEventListener("mousemove", onMove, { passive: true });
    
    // Block native scroll wheel from reaching Spline (prevents zooming)
    const blockWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };
    container.addEventListener("wheel", blockWheel, { capture: true, passive: true });
    
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("wheel", blockWheel, { capture: true });
    };
  }, []);

  // ── RAF loop: smooth mouse + push variables if they exist ─────────
  useEffect(() => {
    const LERP = 0.06;

    const tick = () => {
      smoothMouse.current.x += (rawMouse.current.x - smoothMouse.current.x) * LERP;
      smoothMouse.current.y += (rawMouse.current.y - smoothMouse.current.y) * LERP;

      if (varsChecked.current) {
        const api = splineRef.current as unknown as Record<string, unknown>;
        if (api && typeof api.setVariable === "function") {
          const set = api.setVariable as Function;

          try {
            if (hasMX.current && Math.abs(lastSent.current.mx - smoothMouse.current.x) > 0.001) {
              set("mouseX", smoothMouse.current.x);
              lastSent.current.mx = smoothMouse.current.x;
            }
            if (hasMY.current && Math.abs(lastSent.current.my - smoothMouse.current.y) > 0.001) {
              set("mouseY", smoothMouse.current.y);
              lastSent.current.my = smoothMouse.current.y;
            }
            if (hasSY.current) {
              const progress = scrollYProgress ? scrollYProgress.get() : 0;
              const clamped = Math.max(0, Math.min(1, progress));
              if (Math.abs(lastSent.current.sy - clamped) > 0.0001) {
                set("scrollY", clamped);
                lastSent.current.sy = clamped;
              }
            }
          } catch (err) {
            // If the URL is valid but the specific variables don't exist, we just stop trying to sync them
            // so we don't spam errors, but we DO NOT unmount the Spline canvas!
            varsChecked.current = false;
            hasMX.current = false;
            hasMY.current = false;
            hasSY.current = false;
            // Removed setHasError(true) so the 3D scene stays visible
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className={styles.sceneWrapper} aria-hidden="true">

      {/* Animated loading overlay */}
      <div className={`${styles.loadOverlay} ${isLoaded ? styles.hidden : ""}`}>
        <div className={styles.loader}>
          <span className={styles.loaderDot} />
          <span className={styles.loaderDot} />
          <span className={styles.loaderDot} />
        </div>
      </div>

      {/* 3D scene or graceful fallback */}
      {hasError ? (
        <div className={styles.fallback}>
           <p style={{color: "var(--color-gold)", padding: "2rem", textAlign: "center", lineHeight: "1.5"}}>
             ⚠️ Spline Runtime Error <br/>
             <span style={{fontSize: "14px", color: "#ccc"}}>
               The Spline Runtime requires a <code>.splinecode</code> export URL. <br/>
               Please export from Spline Viewer rather than using a <code>.spline</code> file.
             </span>
           </p>
        </div>
      ) : (
        <Spline
          scene="https://prod.spline.design/pwitNlNftLusscoe/scene.splinecode"
          onLoad={onLoad}
          onError={onError}
          className={styles.splineCanvas}
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 1s ease" }}
        />
      )}
    </div>
  );
}
