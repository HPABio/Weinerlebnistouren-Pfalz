/**
 * Global Tour State Store
 * 
 * This store manages the current selected tour globally across the application.
 * It can be accessed from anywhere and updates automatically when the tour changes.
 */

export interface Tour {
  id: string;
  info: string;
  title: string;
  subtitle: string;
  season: string;
  images: {
    card: string;
    background: string;
    objectPosition: string;
    bgObjectPosition: string;
  };
  longDescription: string;
}

type Listener = (tour: Tour) => void;

class TourStore {
  private currentTour: Tour | null = null;
  private listeners: Set<Listener> = new Set();

  /**
   * Get the current tour
   */
  getCurrentTour(): Tour | null {
    return this.currentTour;
  }

  /**
   * Set the current tour and notify all listeners
   */
  setCurrentTour(tour: Tour): void {
    this.currentTour = tour;
    this.notifyListeners();
  }

  /**
   * Subscribe to tour changes
   * @param listener Function to call when the tour changes
   * @returns Unsubscribe function
   */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    
    // Immediately call listener with current tour if it exists
    if (this.currentTour) {
      listener(this.currentTour);
    }
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of the current tour
   */
  private notifyListeners(): void {
    if (this.currentTour) {
      this.listeners.forEach((listener) => {
        listener(this.currentTour!);
      });
    }
  }
}

// Export a singleton instance
export const tourStore = new TourStore();

// Export for easy access from window object in browser
if (typeof window !== 'undefined') {
  (window as any).tourStore = tourStore;
}

