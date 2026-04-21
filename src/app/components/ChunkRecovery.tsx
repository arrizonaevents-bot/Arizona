"use client";

import { useEffect } from "react";

const RELOAD_KEY = "chunk-recovery-reloaded";

function isChunkLoadFailure(message: string): boolean {
  return /chunk|loading css chunk|failed to fetch dynamically imported module|module script/i.test(message);
}

export default function ChunkRecovery() {
  useEffect(() => {
    const tryRecover = (message: string) => {
      if (!isChunkLoadFailure(message)) return;
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return;
      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
    };

    const onError = (event: ErrorEvent) => {
      const message = event.message || "";
      const filename = event.filename || "";
      tryRecover(`${message} ${filename}`);
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const text =
        typeof reason === "string"
          ? reason
          : reason && typeof reason === "object"
            ? JSON.stringify(reason)
            : "";
      tryRecover(text);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
