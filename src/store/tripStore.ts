import { create } from "zustand";
import { Trip, TripStop } from "@/types/trip";

interface TripState {
  currentTrip: Trip | null;
  stops: TripStop[];
  activities: any[];
  isLoading: boolean;
  
  setCurrentTrip: (trip: Trip | null) => void;
  setStops: (stops: TripStop[]) => void;
  setActivities: (activities: any[]) => void;
  setLoading: (loading: boolean) => void;
  
  addActivity: (activity: any) => void;
  removeActivity: (activityId: string) => void;
}

export const useTripStore = create<TripState>((set) => ({
  currentTrip: null,
  stops: [],
  activities: [],
  isLoading: false,

  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  setStops: (stops) => set({ stops }),
  setActivities: (activities) => set({ activities }),
  setLoading: (loading) => set({ isLoading: loading }),

  addActivity: (activity) => 
    set((state) => ({ activities: [...state.activities, activity] })),
    
  removeActivity: (activityId) => 
    set((state) => ({ 
      activities: state.activities.filter((a) => a.id !== activityId) 
    })),
}));
