"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthGuard from "@/guard/AuthGuard";

interface TicketData {
  ticket_id: number;
  eventId: number;
  ticketName: string;
  description: string;
  type: string;
  price: number | null;
  available: number;
  startDate: string;
  expiredDate: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
}

interface EventData {
  event_id: number;
  name: string;
}

export default function EditTicket() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const ticketId = params.id;

  const [formData, setFormData] = useState<TicketData>({
    ticket_id: Number(ticketId),
    eventId: Number(eventId),
    ticketName: "",
    description: "",
    type: "paid",
    price: 0,
    available: 0,
    startDate: "",
    expiredDate: "",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
  });

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await axios.get(
          `http://localhost:3232/events/${eventId}`
        );
        if (!eventResponse.data) {
          throw new Error("Event not found");
        }
        setEvent(eventResponse.data);

        const ticketResponse = await axios.get(
          `http://localhost:3232/events/${eventId}/tickets`
        );
        const tickets = ticketResponse.data;
        const ticketData = tickets.find(
          (t: TicketData) => t.ticket_id === Number(ticketId)
        );

        if (!ticketData) {
          throw new Error("Ticket not found");
        }

        setFormData({
          ...ticketData,
          startDate: new Date(ticketData.startDate).toISOString().split("T")[0],
          expiredDate: new Date(ticketData.expiredDate)
            .toISOString()
            .split("T")[0],
        });
      } catch (err: any) {
        console.error("Failed to fetch data:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (eventId && ticketId) {
      fetchData();
    }
  }, [eventId, ticketId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "available" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3232/tickets/${ticketId}`, formData);
      router.push(`/event/${eventId}?updatedTicketId=${ticketId}`);
    } catch (err) {
      console.error("Failed to update ticket:", err);
      setError("Failed to update ticket");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          Loading ticket data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-red-500">{error}</div>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard allowedRoles={["ORGANIZER"]}>
      <div className="container mx-auto p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-customDarkBlue">
                Edit Tiket
              </h1>
              {event && (
                <div className="text-gray-600">Event: {event.name}</div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Tiket
                </label>
                <input
                  type="text"
                  name="ticketName"
                  value={formData.ticketName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tipe Tiket
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option value="paid">Berbayar</option>
                    <option value="free">Gratis</option>
                  </select>
                </div>

                {formData.type === "paid" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Harga
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || 0}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                      min="0"
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Jumlah Tiket
                </label>
                <input
                  type="number"
                  name="available"
                  value={formData.available}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  min="0"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tanggal Berakhir
                  </label>
                  <input
                    type="date"
                    name="expiredDate"
                    value={formData.expiredDate}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Informasi Kontak</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-customMediumBlue text-white rounded-md hover:bg-customDarkBlue"
              >
                Simpan Perubahan
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </AuthGuard>
  );
}
