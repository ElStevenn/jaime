import { useState, useEffect, useRef } from 'react';

export function useIntersectionObserver(options = { threshold: 0.15, triggerOnce: true }) {
  const [isIntersecting, setIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (options.triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else {
          if (!options.triggerOnce) {
            setIntersecting(false);
          }
        }
      },
      { threshold: options.threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return [elementRef, isIntersecting];
}
