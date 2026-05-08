// Thanks @ncdai

"use client";

import * as React from "react";

export type CopyState = "idle" | "done" | "error";

export type UseCopyToClipboardOptions = {
  /** Called when the text is successfully copied. */
  onCopySuccess?: (text: string) => void;
  /** Called when the copy operation fails. */
  onCopyError?: (error: Error) => void;
  /** The delay in milliseconds before resetting the state to "idle". Defaults to 1500. */
  resetDelay?: number;
};

export function useCopyToClipboard({
  onCopySuccess,
  onCopyError,
  resetDelay = 1500,
}: UseCopyToClipboardOptions = {}) {
  const [state, setState] = React.useState<CopyState>("idle");
  const resetTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const copy = React.useCallback(
    async (text: string | (() => string)) => {
      // Clear any pending reset
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      try {
        const finalText = typeof text === "function" ? text() : text;
        await navigator.clipboard.writeText(finalText);

        setState("done");

        onCopySuccess?.(finalText);
      } catch (error) {
        setState("error");

        onCopyError?.(
          error instanceof Error ? error : new Error("Copy failed")
        );
      } finally {
        // Schedule reset to idle
        resetTimeoutRef.current = setTimeout(() => {
          setState("idle");
        }, resetDelay);
      }
    },
    [onCopySuccess, onCopyError, resetDelay]
  );

  return { state, copy } as const;
}
