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
import { Image as ImageIcon } from "lucide-react";
import AuthGuard from "@/guard/AuthGuard";

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

function EventCreationPage() {
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [heldBy, setHeldBy] = useState("");
  const [formats, setFormats] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  // const [createdEventId, setCreatedEventId] = useState<number | null>(null);

  const [province, setProvince] = useState<Province | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [location, setLocation] = useState("");
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [topicsResponse, formatsResponse, citiesResponse] =
          await Promise.all([
            axios.get("http://localhost:3232/event-categories/topics"),
            axios.get("http://localhost:3232/event-categories/formats"),
            axios.get("http://localhost:3232/locations/cities"),
          ]);

        setTopics(
          Array.isArray(topicsResponse.data) ? topicsResponse.data : []
        );
        setFormats(
          Array.isArray(formatsResponse.data) ? formatsResponse.data : []
        );
        setCities(citiesResponse.data);
        setProvince({ id: "35", name: "Jawa Timur" });
      } catch (error) {
        console.error("Error fetching topics and formats:", error);
      }
    };

    fetchInitialData();
  }, []);
  const handleCityChange = async (cityId: string) => {
    setIsLoadingLocations(true);
    const city = cities.find((c) => c.id === cityId);
    setSelectedCity(city || null);
    setSelectedDistrict(null);

    try {
      const response = await axios.get(
        `http://localhost:3232/locations/districts/${cityId}`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB");
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = "";

      if (image && imagePreview) {
        try {
          console.log("Uploading image...");
          const uploadResponse = await axios.post(
            "http://localhost:3232/events/upload",
            { image: imagePreview },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!uploadResponse.data?.url) {
            throw new Error("No URL in upload response");
          }

          imageUrl = uploadResponse.data.url;
          console.log("Image uploaded successfully:", imageUrl);
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          throw new Error("Failed to upload image");
        }
      }

      const locationDetailResponse = await axios.post(
        "http://localhost:3232/location-details",
        {
          province: province?.name || "Jawa Timur",
          city: selectedCity?.name || "",
          district: selectedDistrict?.name || "",
        }
      );

      const organiserId = localStorage.getItem("userId");
      const eventPayload = {
        name: eventName,
        description: eventDescription,
        location,
        locationDetailId: locationDetailResponse.data.id,
        date: eventDate,
        time: `${eventTime}:00`,
        heldBy,
        organiserId: organiserId,
        image: imageUrl,
        category: {
          topic: selectedTopic,
          format: selectedFormat,
        },
      };

      console.log("Creating event with payload:", eventPayload);
      const eventResponse = await axios.post(
        "http://localhost:3232/events",
        eventPayload
      );

      if (eventResponse.data?.event_id) {
        router.push(`/event/${eventResponse.data.event_id}`);
      }
    } catch (error) {
      console.error("Full error:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || "Failed to create event");
      } else {
        alert(
          error instanceof Error ? error.message : "Failed to create event"
        );
      }
    }
  };
  return (
    <AuthGuard allowedRoles={["ORGANIZER"]}>
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
                  <div>
                    <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Event Photo
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="event-image"
                      />
                      <label
                        htmlFor="event-image"
                        className="cursor-pointer px-4 py-2 border border-customLightBlue/20 rounded-md hover:bg-gray-50"
                      >
                        Choose Image
                      </label>

                      {imagePreview && (
                        <div className="relative w-20 h-20">
                          <Image
                            src={imagePreview}
                            alt="Event preview"
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {/* <div>
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
                    </div> */}

                    <div className="space-y-4">
                      <label className="flex items-center text-sm font-medium text-customDarkBlue mb-1.5">
                        <MapPin className="w-4 h-4 mr-2" />
                        Lokasi
                      </label>

                      <div className="grid grid-cols-1 gap-3">
                        <input
                          type="text"
                          value="Jawa Timur"
                          disabled
                          className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 bg-gray-100"
                        />

                        <select
                          value={selectedCity?.id || ""}
                          onChange={(e) => handleCityChange(e.target.value)}
                          disabled={isLoadingLocations}
                          className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                        >
                          <option value="">Pilih Kota/Kabupaten</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>

                        <select
                          value={selectedDistrict?.id || ""}
                          onChange={(e) => {
                            const district = districts.find(
                              (d) => d.id === e.target.value
                            );
                            setSelectedDistrict(district || null);
                          }}
                          disabled={!selectedCity || isLoadingLocations}
                          className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                        >
                          <option value="">Pilih Kecamatan</option>
                          {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Masukkan alamat lengkap"
                          className="w-full px-3 py-1.5 rounded-md border border-customLightBlue/20 focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                        />
                      </div>
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
    </AuthGuard>
  );
}

export default EventCreationPage;
