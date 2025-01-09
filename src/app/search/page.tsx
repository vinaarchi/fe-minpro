"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { callAPI } from "@/config/axios";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

interface Event {
  event_id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string | null;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await callAPI.get(`/events?search=${query}`);
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const handleEventClick = (eventId: number) => {
    router.push(`/event/${eventId}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget as HTMLImageElement;
    target.src = "/images/event-list-default.svg";
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Hasil Pencarian untuk &quot;{query}&quot;
      </h1>
      {events.length === 0 ? (
        <p>Tidak ada events ditampilkan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.event_id}
              onClick={() => handleEventClick(event.event_id)}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white"
            >
              <div className="relative w-full h-48">
                <img
                  src={event.image || "/images/event-list-default.svg"}
                  alt={event.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl text-customDarkBlue font-semibold">
                  {event.name}
                </h2>
                <p className="text-customLightBlue mt-2 line-clamp-2">
                  {event.description}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-customMediumBlue" />
                    <span>{event.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-customMediumBlue" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-customMediumBlue" />
                    <span>{new Date(event.time).toLocaleTimeString()}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
