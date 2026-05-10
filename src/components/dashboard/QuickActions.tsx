"use client";

import React from "react";
import { Plus, Search, Map, CheckSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Create Trip",
    icon: Plus,
    href: "/trips/create",
    color: "bg-blue-500",
    description: "Start a new journey",
  },
  {
    title: "Explore",
    icon: Search,
    href: "/explore",
    color: "bg-purple-500",
    description: "Find inspirations",
  },
  {
    title: "Checklists",
    icon: CheckSquare,
    href: "/checklists",
    color: "bg-emerald-500",
    description: "Your packing lists",
  },
  {
    title: "My Trips",
    icon: Map,
    href: "/trips",
    color: "bg-orange-500",
    description: "View all itineraries",
  },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {actions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={action.href}
            className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group"
          >
            <div className={`p-3 rounded-lg ${action.color} text-white mr-4 group-hover:scale-110 transition-transform`}>
              <action.icon size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{action.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{action.description}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
