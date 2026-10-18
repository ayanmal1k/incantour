"use client";

import { useEffect } from "react";

export function ExtensionErrorSuppressor() {
  useEffect(() => {
    function isExtensionMessage(args: unknown[]) {
      try {
        for (let i = 0; i < args.length; i++) {
          const item = args[i];
          if (!item) continue;
          let str = "";
          if (typeof item === "string") {
            str = item;
          } else if (item instanceof Error || (typeof item === "object" && item !== null)) {
            const obj = item as { message?: unknown; stack?: unknown; name?: unknown };
            str = `${String(obj.message || "")} ${String(obj.stack || "")} ${String(obj.name || "")} ${String(item)}`;
          } else {
            str = String(item);
          }
          str = str.toLowerCase();
          if (
            str.includes("metamask") ||
            str.includes("chrome-extension://") ||
            str.includes("moz-extension://") ||
            str.includes("inpage.js") ||
            str.includes("failed to connect to metamask") ||
            str.includes("error restoring session") ||
            str.includes("nkbihfbeogaeaoehlefnkodbefgpgknn")
          ) {
            return true;
          }
        }
        const stack = (new Error().stack || "").toLowerCase();
        if (
          stack.includes("chrome-extension://") ||
          stack.includes("moz-extension://") ||
          stack.includes("inpage.js") ||
          stack.includes("nkbihfbeogaeaoehlefnkodbefgpgknn")
        ) {
          return true;
        }
      } catch {
        // ignore check errors
      }
      return false;
    }

    const origConsoleError = console.error;
    const origConsoleWarn = console.warn;

    console.error = (...args: unknown[]) => {
      if (isExtensionMessage(args)) return;
      origConsoleError.apply(console, args);
    };

    console.warn = (...args: unknown[]) => {
      if (isExtensionMessage(args)) return;
      origConsoleWarn.apply(console, args);
    };

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
        str.includes("inpage.js") ||
        str.includes("failed to connect to metamask") ||
        str.includes("error restoring session") ||
        str.includes("nkbihfbeogaeaoehlefnkodbefgpgknn")
      );
    }

    const errorHandler = (e: ErrorEvent) => {
      if (
        isExtensionError(e.error) ||
        (e.filename && (e.filename.includes("extension://") || e.filename.includes("inpage.js")))
      ) {
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
      console.error = origConsoleError;
      console.warn = origConsoleWarn;
      window.removeEventListener("error", errorHandler, true);
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler, true);
    };
  }, []);

  return null;
}
