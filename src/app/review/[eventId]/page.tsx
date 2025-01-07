"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import AuthGuard from "@/guard/AuthGuard";
import Link from "next/link";
import { use } from "react";

interface Event {
  event_id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default function ReviewPage({ params }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [event, setEvent] = useState<Event | null>(null);
  const { eventId } = use(params);

  if (!eventId || eventId === "undefined") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Invalid Event ID
        </h2>
        <p className="text-gray-500 mb-4">
          We couldn't find the event you're looking for.
        </p>
        <Link
          href="/member/tiket-saya"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Tickets
        </Link>
      </div>
    );
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3232/events/${eventId}`);
        if (!response.ok) throw new Error("Event not found");
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      setError("Please select a rating");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch("http://localhost:3232/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: parseInt(eventId),
          userId: parseInt(userId!),
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      router.push("/member/tiket-saya");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Event Not Found
        </h2>
        <p className="text-gray-500 mb-4">
          We couldn't find the event you're looking for.
        </p>
        <Link
          href="/member/tiket-saya"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <AuthGuard allowedRoles={["CUSTOMER"]}>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">
          Write a Review for {event.name}
        </h1>

        <div className="mb-6">
          <img
            src={event.image || "/default-event.jpg"}
            alt={event.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex gap-2 mb-2">
              {[...Array(5)].map((_, idx) => {
                const ratingValue = idx + 1;
                return (
                  <FaStar
                    key={idx}
                    className="cursor-pointer text-3xl"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(ratingValue)}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Share your experience..."
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}
