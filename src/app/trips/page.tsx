import React from "react";
import { TripsList } from "@/components/trips/TripsList";
import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "My Trips | Traveloop",
  description: "Manage all your travel itineraries in one place.",
};

export default function MyTripsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">My Journeys</h1>
          <p className="text-slate-600 dark:text-slate-400">
            View, manage, and explore all your planned adventures.
          </p>
        </div>
        
        <TripsList />
      </div>
    </main>
  );
}
