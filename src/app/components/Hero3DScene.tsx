"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import styles from "./Hero3DScene.module.css";

interface Hero3DSceneProps {
  onReady?: () => void;
}
const SCENE_URL = "https://prod.spline.design/pwitNlNftLusscoe/scene.splinecode";

function hasVariable(api: Record<string, unknown>, name: string): boolean {
  try {
    if (typeof api.getVariable === "function") {
      (api.getVariable as Function)(name);
      return true;
    }
  } catch { /* does not exist */ }
  return false;
}

export default function Hero3DScene({ onReady }: Hero3DSceneProps) {
  const MIN_OVERLAY_MS = 200; // Accelerated reveal
  const splineRef = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayStartRef = useRef<number>(Date.now());

  const [canMountSpline, setCanMountSpline] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [disable3D, setDisable3D] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    overlayStartRef.current = Date.now();
    setCanMountSpline(true); // Mount immediately
  }, []);

  const onLoad = useCallback((app: Application) => {
    splineRef.current = app;
    setIsLoaded(true); // Instant ready
  }, []);

  const onError = useCallback(() => setHasError(true), []);

  // Detect low-end devices more aggressively
  useEffect(() => {
    if (!isClient) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const navWithMemory = navigator as Navigator & { deviceMemory?: number };
    const navWithConnection = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const lowMemory = typeof navWithMemory.deviceMemory === "number" && navWithMemory.deviceMemory <= 2;
    const isDataSaver = navWithConnection.connection?.saveData === true;
    const slowNetwork = /(^|[^a-z])(slow-2g|2g)([^a-z]|$)/i.test(navWithConnection.connection?.effectiveType ?? "");

    if (media.matches || lowMemory || isDataSaver || slowNetwork) {
      setDisable3D(true);
    } else {
      setDisable3D(false);
    }
  }, [isClient]);

  // STRICT CULLING: unmount Spline immediately when scrolled away
  useEffect(() => {
    if (!isClient) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01, rootMargin: "50px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [isClient]);

  const shouldMountSpline = isClient && !disable3D && isInView && canMountSpline;

  // Keep loader visible long enough to mask 3D startup jank.
  useEffect(() => {
    if (!isLoaded) return;

    const elapsed = Date.now() - overlayStartRef.current;
    const wait = Math.max(0, MIN_OVERLAY_MS - elapsed);
    const timeout = window.setTimeout(() => {
      setShowScene(true);
      if (typeof onReady === "function") onReady();
    }, wait);

    return () => window.clearTimeout(timeout);
  }, [isLoaded, onReady]);

  useEffect(() => {
    if (!hasError && !disable3D) return;
    setShowScene(true);
    if (typeof onReady === "function") onReady();
  }, [hasError, disable3D, onReady]);

  return (
    <div
      ref={containerRef}
      className={styles.sceneWrapper}
      aria-hidden="true"
    >
      {/* 1. Base Layer — subtle depth behind everything */}
      <div className={styles.baseLayer} />

      {/* 2. Static Placeholder Layer — show while loading OR while culled (offscreen) */}
      {(!showScene || !isInView) && (
        <div className={styles.placeholderLayer}>
          <div className={styles.placeholderGraphic} />
        </div>
      )}

      {/* 3. Spline Canvas (The Grand Reveal) */}
      {!hasError && !disable3D && shouldMountSpline && (
        <div
          className={styles.splineCanvas}
          data-loaded={showScene && isInView ? "true" : "false"}
        >
          <Spline
            scene={SCENE_URL}
            onLoad={onLoad}
            onError={onError}
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          />
        </div>
      )}

      {/* 4. Overlay & Fallback */}
      {(hasError || disable3D) ? (
        <div className={styles.fallback}>
          <span>✦</span>
        </div>
      ) : (
        <div
          className={styles.loadOverlay}
          data-loaded={showScene && isInView ? "true" : "false"}
        >
          <div className={styles.spotlightShimmer} />
        </div>
      )}
    </div>
  );
}
