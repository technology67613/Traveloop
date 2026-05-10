"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Plus, Trash2, Luggage, Umbrella, Laptop, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  is_packed: boolean;
}

const categories = [
  { id: "Essentials", icon: Zap },
  { id: "Clothes", icon: Luggage },
  { id: "Electronics", icon: Laptop },
  { id: "Miscellaneous", icon: Umbrella },
];

export const PackingList = ({ tripId }: { tripId: string }) => {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [selectedCat, setSelectedCat] = useState("Essentials");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from("packing_items")
        .select("*")
        .eq("trip_id", tripId)
        .order("created_at", { ascending: true });
      setItems(data || []);
      setLoading(false);
    };
    fetchItems();
  }, [tripId]);

  const addItem = async () => {
    if (!newItem) return;
    const { data, error } = await supabase
      .from("packing_items")
      .insert([{ trip_id: tripId, name: newItem, category: selectedCat, is_packed: false }])
      .select()
      .single();

    if (!error) {
      setItems([...items, data]);
      setNewItem("");
      toast.success("Added to list!");
    }
  };

  const toggleItem = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("packing_items")
      .update({ is_packed: !current })
      .eq("id", id);

    if (!error) {
      setItems(items.map(item => item.id === id ? { ...item, is_packed: !current } : item));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
          <Luggage className="mr-3 text-blue-600" /> Packing Checklist
        </h3>
      </div>

      <div className="p-8 space-y-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="What do you need to pack?"
              className="w-full pl-4 pr-12 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
            />
            <button 
              onClick={addItem}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20"
            >
              <Plus size={20} />
            </button>
          </div>
          <select 
            className="px-4 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-500"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            {categories.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const catItems = items.filter(i => i.category === cat.id);
            return (
              <div key={cat.id} className="space-y-4">
                <div className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                  <cat.icon size={14} className="mr-2" /> {cat.id}
                </div>
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {catItems.map((item) => (
                      <motion.button
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => toggleItem(item.id, item.is_packed)}
                        className={`w-full flex items-center p-4 rounded-2xl border transition-all ${
                          item.is_packed 
                            ? "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 opacity-60" 
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 shadow-sm"
                        }`}
                      >
                        {item.is_packed ? (
                          <CheckCircle2 size={20} className="text-emerald-500 mr-4 shrink-0" />
                        ) : (
                          <Circle size={20} className="text-slate-300 mr-4 shrink-0" />
                        )}
                        <span className={`font-bold text-sm text-left ${item.is_packed ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-200"}`}>
                          {item.name}
                        </span>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
