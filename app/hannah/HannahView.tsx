import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface BathRecord {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string | null;
  notes: string | null;
  is_featured: boolean;
}

export const HannahView: React.FC = () => {
  const [records, setRecords] = useState<BathRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("baths")
      .select("*")
      .eq("user_type", "raymond");
    if (error) setError(error.message);
    else setRecords(data || []);
    setLoading(false);
  };

  // Calculate stats
  const today = new Date().toISOString().slice(0, 10);
  const showersToday = records.filter((r) => r.date === today);
  const lastShower = records
    .slice()
    .sort((a, b) => b.start_time.localeCompare(a.start_time))[0];
  const showersByDay: Record<string, BathRecord[]> = {};
  records.forEach((r) => {
    if (!showersByDay[r.date]) showersByDay[r.date] = [];
    showersByDay[r.date].push(r);
  });
  const mostShowersDay = Object.entries(showersByDay).sort(
    (a, b) => b[1].length - a[1].length
  )[0];
  const featuredCount = records.filter((r) => r.is_featured).length;
  const uniqueLocations = Array.from(
    new Set(records.map((r) => r.location).filter(Boolean))
  );

  function getDuration(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    const min = Math.round((e.getTime() - s.getTime()) / 60000);
    return min > 0 ? `${min} min` : "<1 min";
  }

  return (
    <div className="space-y-8">
      <section className="card">
        <h2 className="text-2xl font-bold mb-4 text-pink-500 flex items-center gap-2">
          <span role="img" aria-label="stats">
            🌸
          </span>{" "}
          Raymond's Shower Stats
        </h2>
        {error && <div className="text-red-500 font-semibold">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-pink-200/60 dark:bg-pink-900/60 rounded-2xl p-4 flex flex-col items-center shadow-lg border-2 border-pink-300 dark:border-pink-800">
              <div className="text-3xl font-bold">{showersToday.length}</div>
              <div className="text-pink-700 dark:text-pink-200 flex items-center gap-1">
                🧼 Showers Today
              </div>
            </div>
            <div className="bg-yellow-100/60 dark:bg-yellow-900/60 rounded-2xl p-4 flex flex-col items-center shadow-lg border-2 border-yellow-200 dark:border-yellow-800">
              <div className="text-3xl font-bold">{featuredCount}</div>
              <div className="text-yellow-700 dark:text-yellow-200 flex items-center gap-1">
                ✨ Featured
              </div>
            </div>
            <div className="bg-blue-200/60 dark:bg-blue-900/60 rounded-2xl p-4 flex flex-col items-center shadow-lg border-2 border-blue-300 dark:border-blue-800">
              <div className="text-3xl font-bold">{uniqueLocations.length}</div>
              <div className="text-blue-700 dark:text-blue-200 flex items-center gap-1">
                📍 Locations
              </div>
            </div>
            <div className="bg-purple-200/60 dark:bg-purple-900/60 rounded-2xl p-4 flex flex-col items-center shadow-lg border-2 border-purple-300 dark:border-purple-800">
              <div className="text-3xl font-bold">{records.length}</div>
              <div className="text-purple-700 dark:text-purple-200 flex items-center gap-1">
                🛁 Total
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="card">
        <h3 className="text-xl font-bold mb-2 text-blue-500 flex items-center gap-2">
          <span role="img" aria-label="last">
            🕒
          </span>{" "}
          Last Shower
        </h3>
        {lastShower ? (
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Date:</span> {lastShower.date}
            </div>
            <div>
              <span className="font-semibold">Time:</span>{" "}
              {lastShower.start_time.slice(11, 16)} -{" "}
              {lastShower.end_time.slice(11, 16)} (
              {getDuration(lastShower.start_time, lastShower.end_time)})
            </div>
            <div>
              <span className="font-semibold">Location:</span>{" "}
              {lastShower.location || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Notes:</span>{" "}
              {lastShower.notes || "None"}
            </div>
          </div>
        ) : (
          <div>No showers yet.</div>
        )}
      </section>
      <section className="card">
        <h3 className="text-xl font-bold mb-2 text-purple-500 flex items-center gap-2">
          <span role="img" aria-label="calendar">
            📅
          </span>{" "}
          Most Showers in a Day
        </h3>
        {mostShowersDay ? (
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Date:</span> {mostShowersDay[0]}
            </div>
            <div>
              <span className="font-semibold">Showers:</span>{" "}
              {mostShowersDay[1].length}
            </div>
            <div>
              <span className="font-semibold">Locations:</span>{" "}
              {Array.from(
                new Set(
                  mostShowersDay[1].map((r) => r.location).filter(Boolean)
                )
              ).join(", ") || "N/A"}
            </div>
          </div>
        ) : (
          <div>No data yet.</div>
        )}
      </section>
      <section className="card">
        <h3 className="text-xl font-bold mb-2 text-green-500 flex items-center gap-2">
          <span role="img" aria-label="fun">
            💖
          </span>{" "}
          Fun Stats
        </h3>
        <ul className="list-disc pl-6 space-y-1 text-purple-700 dark:text-purple-200">
          <li>
            Average showers per day:{" "}
            {records.length
              ? (records.length / Object.keys(showersByDay).length).toFixed(2)
              : 0}
          </li>
          <li>
            Most recent featured shower:{" "}
            {records
              .filter((r) => r.is_featured)
              .sort((a, b) => b.start_time.localeCompare(a.start_time))[0]
              ?.date || "N/A"}
          </li>
          <li>
            Most common location:{" "}
            {(() => {
              const locs = records.map((r) => r.location).filter(Boolean);
              if (!locs.length) return "N/A";
              const freq: Record<string, number> = {};
              locs.forEach((l) => {
                freq[l!] = (freq[l!] || 0) + 1;
              });
              return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
            })()}
          </li>
        </ul>
      </section>
    </div>
  );
};
