"use client";

import React from "react";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface BudgetWidgetProps {
  totalBudget: number;
  spent: number;
}

export const BudgetWidget = ({ totalBudget, spent }: BudgetWidgetProps) => {
  const percentage = Math.min((spent / totalBudget) * 100, 100);
  const isOver = spent > totalBudget;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Trip Budget</h3>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            ${spent.toLocaleString()}
            <span className="text-lg text-slate-400 font-bold ml-1">/ ${totalBudget.toLocaleString()}</span>
          </p>
        </div>
        <div className={`p-3 rounded-2xl ${isOver ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
          {isOver ? <AlertCircle size={24} /> : <TrendingUp size={24} />}
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={`h-full rounded-full ${isOver ? "bg-red-500" : "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"}`}
          />
        </div>
        
        <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
          <span className="text-slate-400">0%</span>
          <span className={`${isOver ? "text-red-500" : "text-blue-600"}`}>{percentage.toFixed(0)}% Utilized</span>
          <span className="text-slate-400">100%</span>
        </div>
      </div>

      {isOver && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center">
          <AlertCircle size={18} className="text-red-500 mr-2 shrink-0" />
          <p className="text-xs text-red-700 dark:text-red-400 font-bold uppercase tracking-tight">
            You are over budget by ${(spent - totalBudget).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
