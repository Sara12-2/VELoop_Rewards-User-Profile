import { useState, useCallback } from 'react';

export const useCopyToClipboard = (timeout = 2000) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const timeoutRef = useState(null);

  const copy = useCallback(async (text) => {
    if (!text) return false;

    try {
      // Try using the modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setIsCopied(true);
      setCopiedText(text);

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset copied state after timeout
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
        setCopiedText('');
      }, timeout);

      return true;
    } catch (error) {
      console.error('Failed to copy text:', error);
      return false;
    }
  }, [timeout]);

  const reset = useCallback(() => {
    setIsCopied(false);
    setCopiedText('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    copy,
    isCopied,
    copiedText,
    reset
  };
};