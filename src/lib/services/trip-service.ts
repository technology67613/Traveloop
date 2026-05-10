import { supabase } from "@/lib/supabase";
import { Trip, TripStop } from "@/types/trip";

export const tripService = {
  async createTrip(tripData: Partial<Trip>, firstStop: Partial<TripStop>) {
    // 1. Create the Trip
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .insert([tripData])
      .select()
      .single();

    if (tripError) throw tripError;

    // 2. Create the first Trip Stop
    const { error: stopError } = await supabase
      .from("trip_stops")
      .insert([{
        ...firstStop,
        trip_id: trip.id,
        order_index: 0
      }]);

    if (stopError) throw stopError;

    // 3. Fetch image for the trip cover if not provided
    if (!trip.cover_image_url && firstStop.city_name) {
      try {
        const response = await fetch(`/api/images?query=${encodeURIComponent(firstStop.city_name)}`);
        const { imageUrl } = await response.json();
        if (imageUrl) {
          await supabase
            .from("trips")
            .update({ cover_image_url: imageUrl })
            .eq("id", trip.id);
        }
      } catch (err) {
        console.error("Failed to fetch cover image:", err);
      }
    }

    return trip;
  }
};
