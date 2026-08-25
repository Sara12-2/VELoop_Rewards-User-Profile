import { useState, useCallback } from "react";

export function useCopyToClipboard(resetDelay = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }, [resetDelay]);

  return { copied, copy };
}