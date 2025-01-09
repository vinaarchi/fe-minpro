/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface EventData {
  event_id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  heldBy: string;
  organiserId: number;
  category_id: number | null;
  image: string | null;
}

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [formData, setFormData] = useState<EventData>({
    event_id: 0,
    name: "",
    description: "",
    location: "",
    date: "",
    time: "",
    heldBy: "",
    organiserId: 0,
    category_id: null,
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3232/events/${id}`);
        const eventData = response.data;

        const date = new Date(eventData.date);
        const formattedDate = date.toISOString().split("T")[0];

        const time = new Date(eventData.time);
        const formattedTime = time.toTimeString().slice(0, 5);

        setFormData({
          ...eventData,
          date: formattedDate,
          time: formattedTime,
        });

        if (eventData.image) {
          setImagePreview(eventData.image);
        }
      } catch (err) {
        console.error("Failed to fetch event details:", err);
        setError("Failed to load event details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      let imageUrl = formData.image;

      if (image && imagePreview) {
        try {
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
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          setError("Failed to upload image");
          return;
        }
      }

      const formattedDate = formData.date;
      const formattedTime = `${formData.time}:00`;

      const updateData = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        date: formattedDate,
        time: formattedTime,
        heldBy: formData.heldBy,
        organiserId: formData.organiserId,
        category_id: formData.category_id,
        image: imageUrl,
      };


      await axios.patch(
        `http://localhost:3232/events/${id}`,
        updateData
      );


      setSuccessMessage("Event updated successfully!");

      setTimeout(() => {
        router.push(`/event/${id}`);
      }, 2000);
    } catch (err: any) {
      console.error("Failed to update event:", err.response?.data || err);
      setError(
        err.response?.data?.message ||
          "Failed to update event. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6">
        <div className="text-center">Loading event details...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-customMediumBlue">
        Edit Event
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-600">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Nama Event
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
          />
        </div>

        <div>
          <label htmlFor="location" className="block mb-2 font-medium">
            Lokasi
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block mb-2 font-medium">
              Tanggal
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
            />
          </div>

          <div>
            <label htmlFor="time" className="block mb-2 font-medium">
              Waktu
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
            />
          </div>
        </div>

        <div>
          <label htmlFor="heldBy" className="block mb-2 font-medium">
            Penyelenggara
          </label>
          <input
            type="text"
            id="heldBy"
            name="heldBy"
            value={formData.heldBy}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
          />
        </div>

        <div className="space-y-2">
          <label className="block mb-2 font-medium">Event Image</label>
          <div className="flex items-center gap-4">
            <div className="relative h-40 w-40 bg-gray-100 rounded-md overflow-hidden">
              {imagePreview || formData.image ? (
                <Image
                  src={imagePreview || formData.image || ""}
                  alt="Event preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <ImageIcon size={24} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="event-image"
              />
              <label
                htmlFor="event-image"
                className="block px-4 py-2 bg-customLightBlue text-white rounded-md hover:bg-customMediumBlue transition-colors cursor-pointer text-center"
              >
                {formData.image ? "Change Image" : "Upload Image"}
              </label>
              {(imagePreview || formData.image) && (
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                    setFormData((prev) => ({ ...prev, image: null }));
                  }}
                  className="block w-full px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isUploading}
            className={`px-6 py-2 ${
              isUploading
                ? "bg-gray-400"
                : "bg-customMediumBlue hover:bg-customDarkBlue"
            } text-white rounded-md transition-colors`}
          >
            {isUploading ? "Updating..." : "Perbarui Event"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
