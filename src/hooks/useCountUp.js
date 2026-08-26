import { useState, useEffect, useRef } from 'react';

export const useCountUp = (targetValue, duration = 1000, startValue = 0) => {
  const [currentValue, setCurrentValue] = useState(startValue);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (targetValue === undefined || targetValue === null) {
      setCurrentValue(0);
      setIsComplete(true);
      return;
    }

    // Reset state when target changes
    setCurrentValue(startValue);
    setIsComplete(false);
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Ease out cubic function for smooth animation
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (targetValue - startValue) * eased);
      
      setCurrentValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
        setIsComplete(true);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, startValue]);

  return currentValue;
};