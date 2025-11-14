/**
 * React Hook for Tour Store
 * 
 * Provides a React hook to subscribe to the global tour store.
 * This makes it easy to use the tour store in React components.
 */

import { useState, useEffect } from "react";
import { tourStore, type Tour } from "./tourStore";

/**
 * Hook to get the current tour from the global store
 * @returns The current tour or null if no tour is set
 */
export function useCurrentTour(): Tour | null {
  const [currentTour, setCurrentTour] = useState<Tour | null>(
    tourStore.getCurrentTour()
  );

  useEffect(() => {
    // Subscribe to tour changes
    const unsubscribe = tourStore.subscribe((tour) => {
      setCurrentTour(tour);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return currentTour;
}

