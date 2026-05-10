import React from "react";
import { CreateTripForm } from "@/components/trips/CreateTripForm";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Plan a New Trip | Traveloop",
  description: "Start designing your perfect itinerary.",
};

export default function CreateTripPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/dashboard"
          className="inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Plan Your Next Adventure
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Tell us where you're going and when. We'll help you handle the rest.
          </p>
        </div>

        <CreateTripForm />
      </div>
    </main>
  );
}
