"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
  FaUsers,
  FaEdit,
} from "react-icons/fa";

interface EventDetail {
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
  createdAt: string;
  updatedAt: string;
}

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

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newTicketId = searchParams.get("newTicketId");
  const id = params?.id;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [newTicket, setNewTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allTickets, setAllTickets] = useState<TicketData[]>([]);
  const [showNotification, setShowNotification] = useState(!!newTicketId);

  const [activeTab, setActiveTab] = useState<"description" | "tickets">(
    "description"
  );
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Event ID is missing.");
      setLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        console.log("Fetching event details for ID:", id);
        const response = await axios.get(`http://localhost:3232/events/${id}`);
        console.log("Event response data:", response.data);

        if (!response.data) {
          throw new Error("No event data received");
        }

        setEvent(response.data);
      } catch (err) {
        console.error("Failed to fetch event details:", err);
        setError("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log("Fetching tickets for event:", id);
        const response = await axios.get(
          `http://localhost:3232/events/${id}/tickets`
        );

        if (!response.data) {
          throw new Error("No tickets data received");
        }

        console.log("Ticket response data:", response.data);
        setAllTickets(response.data);
      } catch (error: any) {
        console.error("Error fetching tickets:", error);
      }
    };

    if (id) {
      fetchTickets();
    }
  }, [id]);

  useEffect(() => {
    const fetchNewTicket = async () => {
      if (!newTicketId) {
        console.log("No ticket ID provided");
        return;
      }

      try {
        console.log("NewTicketId type:", typeof newTicketId);
        console.log("NewTicketId value:", newTicketId);

        const response = await axios.get(
          `http://localhost:3232/events/${id}/tickets`
        );

        console.log("Response data:", response.data);

        if (Array.isArray(response.data)) {
          console.log(
            "Ticket IDs in response:",
            response.data.map((t) => t.ticket_id)
          );
        }

        const ticketData = Array.isArray(response.data)
          ? response.data.find(
              (ticket) =>
                ticket.ticket_id === Number(newTicketId) ||
                ticket.ticket_id === newTicketId
            )
          : null;

        console.log("Found ticket data:", ticketData);

        if (ticketData) {
          setNewTicket(ticketData);
        } else {
          console.log("Ticket not found in response");
        }
      } catch (error: any) {
        console.error("Error fetching ticket details:", {
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
      }
    };

    fetchNewTicket();
  }, [newTicketId, id]);

  const formatToIDR = (price: number | null) =>
    price
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price)
      : "N/A";

  const handleCreateTicket = () => {
    if (event) {
      router.push(`/create-ticket?eventId=${event.event_id}`);
    }
  };
  const handleEditEvent = () => {
    if (event) {
      router.push(`/edit-event/${event.event_id}`);
    }
  };

  const handleBuyTicket = () => {
    if (selectedTicket) {
      console.log("Buying ticket:", selectedTicket);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4">Loading event details...</div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4 text-red-500">{error}</div>
    );
  }

  if (!event)
    return <div className="text-gray-500">Event details are unavailable.</div>;

  return (
    <div className="max-w-7xl mx-auto my-8 p-6">
      {newTicket && showNotification && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md relative">
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
          <h3 className="text-lg font-bold text-green-800">
            Tiket Berhasil Dibuat!
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <p>
              <strong>Nama Tiket:</strong> {newTicket.ticketName || "N/A"}
            </p>
            {/* <p>
              <strong>Tipe:</strong> {newTicket.type || "N/A"}
            </p> */}
            <p>
              <strong>Harga:</strong>{" "}
              {newTicket.type === "free"
                ? "Gratis"
                : formatToIDR(newTicket.price)}
            </p>
            <p>
              <strong>Tiket Tersedia:</strong> {newTicket.available || "N/A"}
            </p>

            <p>
              <strong>Nama Narahubung:</strong> {newTicket.contactName}
            </p>
            <p>
              <strong>Email Narahubung:</strong> {newTicket.contactEmail}
            </p>
            <p>
              <strong>No. Telp Narahubung:</strong> {newTicket.contactNumber}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mb-8">
        {/*kiri atas*/}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96">
          {event.image ? (
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <img
              src="/api/placeholder/800/600"
              alt="gambar event"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>

        {/*kanan atas*/}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-customMediumBlue">
              {event.name}
            </h1>
            <button
              onClick={handleEditEvent}
              className="px-4 py-2 bg-customLightBlue text-white rounded-md hover:bg-customMediumBlue transition-colors flex items-center gap-2"
            >
              <FaEdit /> Edit Event
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-customLightBlue" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-customLightBlue" />
              <span>{event.heldBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-customLightBlue" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-customLightBlue" />
              <span>
                {new Date(event.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/*kiri bawah*/}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "description"
                  ? "bg-customMediumBlue text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Deskripsi
            </button>
            <button
              onClick={() => setActiveTab("tickets")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "tickets"
                  ? "bg-customMediumBlue text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Tiket
            </button>
          </div>

          {activeTab === "description" ? (
            <div className="prose">{event.description}</div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tiket Tersedia</h2>
                <button
                  onClick={handleCreateTicket}
                  className="px-4 py-2 bg-customOrange text-white rounded-md hover:bg-[#f57b1d]"
                >
                  Buat Tiket
                </button>
              </div>

              <div className="space-y-4" key="tickets-container">
                {allTickets.map((ticket: TicketData) => (
                  <div
                    key={`ticket-${ticket.ticket_id || ticket.ticket_id}`}
                    onClick={() => setSelectedTicket(ticket)}
                    className="p-4 rounded-md cursor-pointer transition-all border border-gray-200 hover:border-gray-300"
                    style={{
                      borderColor:
                        selectedTicket?.ticket_id === ticket.ticket_id
                          ? "#424769"
                          : "",
                      borderWidth:
                        selectedTicket?.ticket_id === ticket.ticket_id
                          ? "2px"
                          : "1px",
                      backgroundColor:
                        selectedTicket?.ticket_id === ticket.ticket_id
                          ? "#f8f9fa"
                          : "",
                    }}
                  >
                    <h3 className="font-semibold">{ticket.ticketName}</h3>
                    <p className="text-gray-600">{formatToIDR(ticket.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/*kanan bawah*/}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {selectedTicket ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                {selectedTicket.ticketName}
              </h2>
              <div className="space-y-4 mb-6">
                <p>{selectedTicket.description}</p>
                <p className="text-xl font-semibold">
                  Harga: {formatToIDR(selectedTicket.price)}
                </p>
                <p>Tersedia: {selectedTicket.available}</p>
                <div className="text-sm text-gray-600">
                  <p>
                    Berlaku mulai:{" "}
                    {new Date(selectedTicket.startDate).toLocaleString()}
                  </p>
                  <p>
                    Berlaku hingga:{" "}
                    {new Date(selectedTicket.expiredDate).toLocaleString()}
                  </p>

                  <p>
                    <strong>Nama Narahubung:</strong>{" "}
                    {selectedTicket.contactName}
                  </p>
                  <p>
                    <strong>Email Narahubung:</strong>{" "}
                    {selectedTicket.contactEmail}
                  </p>
                  <p>
                    <strong>No.Telp Narahubung:</strong>{" "}
                    {selectedTicket.contactNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={handleBuyTicket}
                className="w-full py-3 bg-customMediumBlue text-white rounded-md hover:bg-customDarkBlue"
              >
                Beli Tiket
              </button>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Pilih tiket untuk melihat detail.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
