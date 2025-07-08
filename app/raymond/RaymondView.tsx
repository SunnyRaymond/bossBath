import React, { useState, useEffect } from "react";
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

export const RaymondView: React.FC = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [records, setRecords] = useState<BathRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("baths")
      .select("*")
      .eq("user_type", "raymond")
      .order("date", { ascending: false })
      .order("start_time", { ascending: false });
    if (error) setError(error.message);
    else setRecords(data || []);
    setLoading(false);
  };

  const handleLocation = async () => {
    setLocationLoading(true);
    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          let place =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.hamlet ||
            "";
          let country = data.address?.country || "";
          let display =
            place && country
              ? `${place}, ${country}`
              : country || place || `${latitude},${longitude}`;
          setLocation(display);
        } catch (e) {
          setError("Failed to retrieve place name.");
        }
        setLocationLoading(false);
      },
      () => {
        setError("Failed to retrieve location.");
        setLocationLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!date || !startTime || !endTime) {
      setError("Date, start time, and end time are required.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("baths").insert([
      {
        user_type: "raymond",
        date,
        start_time: `${date}T${startTime}:00Z`,
        end_time: `${date}T${endTime}:00Z`,
        location: location || null,
        notes: notes || null,
        is_featured: isFeatured,
      },
    ]);
    if (error) setError(error.message);
    else {
      setSuccess("Shower recorded!");
      setDate("");
      setStartTime("");
      setEndTime("");
      setLocation("");
      setNotes("");
      setIsFeatured(false);
      fetchRecords();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-2xl font-bold mb-2 text-pink-500 flex items-center gap-2">
          <span role="img" aria-label="shower">
            🛁
          </span>{" "}
          Record a Shower
        </h2>
        {error && <div className="text-red-500 font-semibold">{error}</div>}
        {success && (
          <div className="text-green-500 font-semibold">{success}</div>
        )}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium">Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Start Time</label>
            <input
              type="time"
              className="input input-bordered w-full"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">End Time</label>
            <input
              type="time"
              className="input input-bordered w-full"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block font-medium">Location</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
            />
          </div>
          <button
            type="button"
            className="btn btn-sm btn-primary flex items-center gap-2"
            onClick={handleLocation}
            disabled={locationLoading}
          >
            {locationLoading ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-pink-400 border-t-transparent rounded-full"></span>
            ) : (
              <span role="img" aria-label="location">
                📍
              </span>
            )}
            Get Location
          </button>
        </div>
        <div>
          <label className="block font-medium">Notes</label>
          <textarea
            className="input input-bordered w-full"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any notes..."
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <label htmlFor="featured" className="font-medium">
            Mark as featured shower
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "💖 Record Shower"}
        </button>
      </form>
      <section className="card mt-4">
        <h2 className="text-xl font-bold mb-4 text-purple-500 flex items-center gap-2">
          <span role="img" aria-label="history">
            📜
          </span>{" "}
          Previous Showers
        </h2>
        {loading && <div>Loading...</div>}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {records.map((rec) => (
            <li
              key={rec.id}
              className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div>
                <span className="font-semibold text-pink-700 dark:text-pink-300">
                  {rec.date}
                </span>{" "}
                —
                <span className="ml-2">
                  {rec.start_time.slice(11, 16)} - {rec.end_time.slice(11, 16)}
                </span>
                {rec.is_featured && (
                  <span className="featured-badge">✨ Featured</span>
                )}
              </div>
              <div className="text-sm text-purple-500 dark:text-purple-300">
                {rec.location && <span>📍 {rec.location} </span>}
                {rec.notes && <span>📝 {rec.notes}</span>}
              </div>
            </li>
          ))}
          {records.length === 0 && !loading && (
            <li className="text-gray-500">No records yet.</li>
          )}
        </ul>
      </section>
    </div>
  );
};
