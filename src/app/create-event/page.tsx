"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Layout,
  Tag,
  Palette,
} from "lucide-react";

function EventCreationPage() {
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [heldBy, setHeldBy] = useState("");
  const [formats, setFormats] = useState<string[]>([]);
  // const [createdEventId, setCreatedEventId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTopicsAndFormats = async () => {
      try {
        const [topicsResponse, formatsResponse] = await Promise.all([
          axios.get("http://localhost:3232/event-categories/topics"),
          axios.get("http://localhost:3232/event-categories/formats"),
        ]);

        setTopics(
          Array.isArray(topicsResponse.data) ? topicsResponse.data : []
        );
        setFormats(
          Array.isArray(formatsResponse.data) ? formatsResponse.data : []
        );
      } catch (error) {
        console.error("Error fetching topics and formats:", error);
      }
    };

    fetchTopicsAndFormats();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log("Starting event creation...");

      const eventCategoryResponse = await axios.post(
        "http://localhost:3232/event-categories",
        {
          topic: selectedTopic,
          format: selectedFormat,
        }
      );

      console.log("Category Response:", eventCategoryResponse.data);
      const eventCategoryId = eventCategoryResponse.data.id;

      const eventPayload = {
        name: eventName,
        description: eventDescription,
        location: eventLocation,
        date: eventDate,
        time: `${eventTime}:00`,
        heldBy: heldBy,
        organiserId: 1,
        categoryId: eventCategoryId,
      };

      console.log("Event Payload:", eventPayload);

      const eventResponse = await axios.post(
        "http://localhost:3232/events",
        eventPayload
      );

      console.log(
        "Full Event Response:",
        JSON.stringify(eventResponse, null, 2)
      );

      if (!eventResponse || !eventResponse.data) {
        throw new Error("No response data received from server");
      }

      if (
        typeof eventResponse.data === "object" &&
        eventResponse.data !== null
      ) {
        const responseData = eventResponse.data;
        const eventId = responseData.event_id;

        console.log("Event ID from response:", eventId);

        if (!eventId) {
          throw new Error("Could not find event ID in server response");
        }

        router.push(`/event/${eventId}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        alert(`Error creating event: ${error.message}`);
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Non-axios error:", errorMessage);
        alert(`Error creating event: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="h-screen bg-white p-6">
      <div className="h-full max-w-5xl mx-auto relative">
        <div className="h-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="h-full grid md:grid-cols-[400px,1fr]">
            {/*left column*/}
            <div className="p-8 bg-customLightBlue text-white flex flex-col">
              <div className="flex flex-col items-start space-y-2">
                <h2 className="text-4xl font-bold tracking-wide">
                  Mulai
                  <br />
                  Buat
                  <br />
                  Event
                </h2>
                <p className="text-customOrange text-xl pt-7">
                  Rancang event Anda dengan mudah dan cepat.
                </p>
              </div>

              <div className="relative flex-1 mt-8">
                <Image
                  src="/images/undraw-events.svg"
                  alt="event illustration"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
            {/*right column */}
            <div className="p-6 overflow-y-auto">
              <div className="max-w-[460px] space-y-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                    <Layout className="w-4 h-4 mr-2" />
                    Nama Event
                  </label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                    placeholder="Masukkan nama event"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                    Deskripsi
                  </label>
                  <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue h-20"
                    placeholder="Deskripsikan event Anda"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                      <MapPin className="w-4 h-4 mr-2" />
                      Lokasi
                    </label>
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                      <Calendar className="w-4 h-4 mr-2" />
                      Tanggal
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                      <Clock className="w-4 h-4 mr-2" />
                      Waktu
                    </label>
                    <input
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                      <Tag className="w-4 h-4 mr-2" />
                      Topik
                    </label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                    >
                      <option value="">Pilih Topik</option>
                      {topics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                      <Palette className="w-4 h-4 mr-2" />
                      Format
                    </label>
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                    >
                      <option value="">Pilih Format</option>
                      {formats.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                      <Users className="w-4 h-4 mr-2" />
                      Penyelenggara
                    </label>
                    <input
                      type="text"
                      value={heldBy}
                      onChange={(e) => setHeldBy(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                      placeholder="Masukkan nama penyelenggara"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-customOrange text-white py-2 rounded-md hover:bg-[#f87f22]/90 transition-colors duration-200 font-medium mt-6"
                >
                  Buat Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCreationPage;
