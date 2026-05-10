"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CityAutocomplete } from "./CityAutocomplete";
import { tripService } from "@/lib/services/trip-service";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Calendar as CalendarIcon, Type, FileText } from "lucide-react";
import { motion } from "framer-motion";

const tripSchema = z.object({
  name: z.string().min(3, "Trip name must be at least 3 characters"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

type TripFormValues = z.infer<typeof tripSchema>;

export const CreateTripForm = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [cityError, setCityError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
  });

  const onSubmit = async (values: TripFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a trip");
      return;
    }

    if (!selectedCity) {
      setCityError("Please select a destination city");
      return;
    }

    setLoading(true);
    try {
      const trip = await tripService.createTrip(
        {
          user_id: user.id,
          name: values.name,
          description: values.description,
          start_date: values.startDate,
          end_date: values.endDate,
        },
        {
          city_name: selectedCity.name,
          city_id: selectedCity.id,
          country: selectedCity.country,
          start_date: values.startDate,
          end_date: values.endDate,
        }
      );

      toast.success("Trip created successfully!");
      router.push(`/trips/${trip.id}`);
    } catch (error: any) {
      console.error("Create trip error:", error);
      toast.error(error.message || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Trip Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Type size={18} />
            </div>
            <input
              {...register("name")}
              placeholder="Summer Vacation 2024"
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <CityAutocomplete 
          onSelect={(city) => {
            setSelectedCity(city);
            setCityError("");
          }} 
          error={cityError}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <CalendarIcon size={18} />
              </div>
              <input
                {...register("startDate")}
                type="date"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              End Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <CalendarIcon size={18} />
              </div>
              <input
                {...register("endDate")}
                type="date"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description (Optional)
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
              <FileText size={18} />
            </div>
            <textarea
              {...register("description")}
              placeholder="Tell us more about your trip..."
              rows={3}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Creating Trip...
          </>
        ) : (
          "Start Planning"
        )}
      </button>
    </motion.form>
  );
};
