"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  Ticket,
  Calendar,
  User,
  Mail,
  Phone,
  Clock,
  CreditCard,
  FileText,
  Users,
} from "lucide-react";

interface TicketData {
  eventId: number;
  ticketName: string;
  description: string;
  type: "paid" | "free";
  price: number | null;
  available: number;
  startDate: string;
  expiredDate: string;

  contactName: string;
  contactEmail: string;
  contactNumber: string;
}

export default function CreateTicketPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventId");

  const [formData, setFormData] = useState<TicketData>({
    eventId: eventId ? parseInt(eventId) : 0,
    ticketName: "Tiket Reguler",
    description: "",
    type: "paid",
    price: 0,
    available: 1,
    startDate: new Date().toISOString(),
    expiredDate: new Date().toISOString(),

    contactName: "",
    contactEmail: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formatRupiah = (value: number | string): string =>
    `Rp ${parseInt(value.toString()).toLocaleString("id-ID")}`;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        type: value as "paid" | "free",

        price: value === "free" ? null : prev.price || 0,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? value === ""
            ? null
            : parseInt(value.replace(/\D/g, ""))
          : ["available"].includes(name)
          ? parseInt(value)
          : name.includes("Date")
          ? new Date(value).toISOString()
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!eventId) {
      setError("Event ID is missing");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const ticketPayload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        expiredDate: new Date(formData.expiredDate).toISOString(),
        price: formData.type === "free" ? null : formData.price,
      };

      console.log("Submitting ticket payload:", ticketPayload);

      const response = await axios.post(
        "http://localhost:3232/tickets",
        ticketPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Ticket creation response:", response.data);

      const createdTicketId = response.data.id || response.data.ticket_id;

      if (!createdTicketId) {
        console.error("No ticket ID in response:", response.data);
        throw new Error("No ticket ID received");
      }

      router.push(`/event/${eventId}?newTicketId=${createdTicketId}`);
    } catch (err: any) {
      console.error("Full error details:", err);
      console.error("Error response data:", err.response?.data);
      setError(
        err.response?.data?.error ||
          "Failed to create ticket. Please check all fields."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/*form*/}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <Ticket className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Buat Tiket</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4" />
                  Nama Tiket
                </label>
                <input
                  type="text"
                  name="ticketName"
                  value={formData.ticketName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4" />
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CreditCard className="w-4 h-4" />
                  Tipe
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                >
                  <option value="paid">Berbayar</option>
                  <option value="free">Gratis</option>
                </select>
              </div>

              {formData.type === "paid" && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <CreditCard className="w-4 h-4" />
                    Harga
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={
                      formData.type === "paid" && formData.price
                        ? formatRupiah(formData.price)
                        : ""
                    }
                    onChange={handleChange}
                    required={formData.type === "paid"}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                  />
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users className="w-4 h-4" />
                  Jumlah Tiket
                </label>
                <input
                  type="number"
                  name="available"
                  value={formData.available}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4" />
                  Tanggal Berlaku Mulai
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={new Date(formData.startDate)
                    .toISOString()
                    .slice(0, 16)}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Clock className="w-4 h-4" />
                  Tanggal Berakhir
                </label>
                <input
                  type="datetime-local"
                  name="expiredDate"
                  value={new Date(formData.expiredDate)
                    .toISOString()
                    .slice(0, 16)}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4" />
                  Nama Narahubung
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail className="w-4 h-4" />
                  Email Narahubung
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4" />
                  No. Telp Narahubung
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customMediumBlue"
                />
              </div>
            </div>

            {error && <div className="text-red-500 mt-2">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-customMediumBlue text-white rounded-md hover:bg-customDarkBlue focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors"
            >
              {loading ? "Membuat tiket..." : "Buat Tiket"}
            </button>
          </form>
        </div>

        {/*ilustrasi*/}
        <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
          <img
            src="/images/undraw_ticket-create.svg"
            alt="Ticket Creation Illustration"
            className="w-full max-w-md"
          />
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Rancang Tiket Acara Anda
            </h2>
            <p className="text-gray-600">
              Pastikan setiap peserta memiliki akses ke acara Anda dengan tiket
              yang dirancang sesuai kebutuhan dan mudah digunakan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
