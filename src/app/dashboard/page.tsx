import React from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingTrips } from "@/components/dashboard/UpcomingTrips";
import { PopularDestinations } from "@/components/dashboard/PopularDestinations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Traveloop",
  description: "Manage your trips and discover new destinations.",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <QuickActions />
        <UpcomingTrips />
        <PopularDestinations />
      </div>
    </main>
  );
}
