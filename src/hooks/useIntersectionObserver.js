import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting;
      setIsIntersecting(isVisible);

      if (isVisible) {
        setHasIntersected(true);
        if (defaultOptions.triggerOnce) {
          observerRef.current.disconnect();
        }
      }
    }, {
      root: defaultOptions.root,
      rootMargin: defaultOptions.rootMargin,
      threshold: defaultOptions.threshold
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [defaultOptions.root, defaultOptions.rootMargin, defaultOptions.threshold, defaultOptions.triggerOnce]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected
  };
};