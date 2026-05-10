"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, Save, Trash2, Edit3, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { toast } from "sonner";

interface Note {
  id: string;
  trip_id: string;
  content: string;
  created_at: string;
}

export const JournalFeed = ({ tripId }: { tripId: string }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await supabase
        .from("notes")
        .select("*")
        .eq("trip_id", tripId)
        .order("created_at", { ascending: false });
      setNotes(data || []);
      setLoading(false);
    };
    fetchNotes();
  }, [tripId]);

  const saveNote = async () => {
    if (!newNote) return;
    setIsSaving(true);
    const { data, error } = await supabase
      .from("notes")
      .insert([{ trip_id: tripId, content: newNote }])
      .select()
      .single();

    if (!error) {
      setNotes([data, ...notes]);
      setNewNote("");
      toast.success("Memory saved!");
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <Edit3 className="text-blue-600" />
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Capture a Memory</h3>
        </div>
        <textarea
          rows={4}
          placeholder="How was your day? Jot down some memories..."
          className="w-full p-6 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700 dark:text-slate-200"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={saveNote}
            disabled={isSaving || !newNote}
            className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
            Post to Journal
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
          <BookOpen size={14} className="mr-2" /> Recent Entries
        </h3>
        
        <AnimatePresence mode="popLayout">
          {notes.map((note, idx) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm group relative"
            >
              <div className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 mb-4">
                <Calendar size={14} className="mr-2" />
                {format(new Date(note.created_at), "MMMM d, yyyy • h:mm a")}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                {note.content}
              </p>
              
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!loading && notes.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 italic">Your journal is empty. Start writing!</p>
          </div>
        )}
      </div>
    </div>
  );
};
