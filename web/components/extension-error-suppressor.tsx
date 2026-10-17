"use client";

import { useEffect } from "react";

export function ExtensionErrorSuppressor() {
  useEffect(() => {
    function isExtensionError(err: unknown) {
      if (!err) return false;
      const str = (
        (typeof err === "object" && err !== null && "message" in err ? String((err as { message: unknown }).message) : "") +
        " " +
        (typeof err === "object" && err !== null && "stack" in err ? String((err as { stack: unknown }).stack) : "") +
        " " +
        String(err)
      ).toLowerCase();
      return (
        str.includes("metamask") ||
        str.includes("chrome-extension://") ||
        str.includes("moz-extension://") ||
        str.includes("inpage.js")
      );
    }

    const errorHandler = (e: ErrorEvent) => {
      if (isExtensionError(e.error) || (e.filename && e.filename.includes("extension://"))) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return true;
      }
    };

    const unhandledRejectionHandler = (e: PromiseRejectionEvent) => {
      if (isExtensionError(e.reason)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return true;
      }
    };

    window.addEventListener("error", errorHandler, true);
    window.addEventListener("unhandledrejection", unhandledRejectionHandler, true);

    return () => {
      window.removeEventListener("error", errorHandler, true);
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler, true);
    };
  }, []);

  return null;
}
