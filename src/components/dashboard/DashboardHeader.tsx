"use client";

import React from "react";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";

export const DashboardHeader = () => {
  const { profile } = useAuthStore();

  return (
    <header className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, {profile?.first_name || "Traveler"}! 👋
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Where will your next adventure take you?
        </p>
      </motion.div>
    </header>
  );
};
