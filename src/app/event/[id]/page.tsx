/* eslint-disable @typescript-eslint/no-explicit-any */
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
  FaStar,
  FaTrash,
  FaSave,
} from "react-icons/fa";
import { useAppSelector } from "@/lib/redux/hooks";

interface Review {
  id: number;
  eventId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    username: string;
    imgProfile: string | null;
  };
}

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
  locationDetail: {
    province: string;
    city: string;
    district: string;
  };
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
interface Promotion {
  promotion_id: number;
  type: "PERCENTAGE" | "FLAT";
  value: number;
  promotionCode: string;
  startDate: string;
  expirationDate: string;
  maxUse: number;
  useCount: number;
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
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activeTab, setActiveTab] = useState<
    "description" | "tickets" | "promotions"
  >("description");
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [editingReview, setEditingReview] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    rating: 0,
    comment: "",
  });
  const user = useAppSelector((state) => state.userReducer);

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

        console.log("Image URL:", response.data.image);

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

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/events/${id}/promotions`
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    if (id) {
      fetchPromotions();
    }
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/events/${id}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id]);

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

  // const handleEditTicket = (ticketId: number) => {
  //   router.push(`/edit-ticket/${ticketId}?eventId=${event?.event_id}`);
  // };

  // const handleDeleteTicket = async (ticketId: number) => {
  //   if (!confirm("Are you sure you want to delete this ticket?")) return;

  //   try {
  //     await axios.delete(`http://localhost:3232/tickets/${ticketId}`);
  //     setAllTickets((tickets) =>
  //       tickets.filter((t) => t.ticket_id !== ticketId)
  //     );
  //     setSelectedTicket(null);
  //   } catch (err) {
  //     console.error("Failed to delete ticket:", err);
  //   }
  // };

  const handleBuyTicket = () => {
    if (selectedTicket) {
      if (selectedTicket.available <= 0) {
        alert("Tiket sudah habis terjual");
        return;
      }
      router.push(`/transaction/${selectedTicket.ticket_id}`);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      console.log("Submitting review with userId:", userId);
      console.log("Full review data:", {
        ...newReview,
        userId: parseInt(userId || "0"),
      });
      const response = await axios.post(
        `http://localhost:3232/events/${id}/reviews`,
        { ...newReview, userId: parseInt(userId || "0") }
      );
      console.log("Review response ini:", response.data);
      setReviews([response.data, ...reviews]);
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };
  // const userId = localStorage.getItem("userId");
  const handleEditClick = (review: Review) => {
    setEditingReview(review.id);
    setEditForm({
      rating: review.rating,
      comment: review.comment,
    });
  };

  const handleUpdateReview = async (reviewId: number) => {
    try {
      await axios.patch(`http://localhost:3232/reviews/${reviewId}`, editForm);

      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, ...editForm } : review
        )
      );

      setEditingReview(null);
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:3232/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
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
        <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96">
          {event.image ? (
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <img
              src="/images/event-list-default.svg"
              alt="gambar event"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-customMediumBlue">
              {event.name}
            </h1>
            {user.isAuth && user.role === "ORGANIZER" && (
              <>
                <button
                  onClick={handleEditEvent}
                  className="px-4 py-2 bg-customLightBlue text-white rounded-md hover:bg-customMediumBlue transition-colors flex items-center gap-2"
                >
                  <FaEdit /> Edit Event
                </button>
              </>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-customLightBlue" />
              <span>{event.location}</span>
            </div>
            {event.locationDetail && (
              <div className="ml-6">
                <p>Provinsi: {event.locationDetail.province}</p>
                <p>Kota: {event.locationDetail.city}</p>
                <p>Kecamatan: {event.locationDetail.district}</p>
              </div>
            )}
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
            <button
              onClick={() => setActiveTab("promotions")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "promotions"
                  ? "bg-customMediumBlue text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Promosi
            </button>
          </div>

          {activeTab === "description" ? (
            <div className="prose">{event.description}</div>
          ) : activeTab === "tickets" ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tiket Tersedia</h2>
                {user.isAuth && user.role === "ORGANIZER" && (
                  <button
                    onClick={handleCreateTicket}
                    className="px-4 py-2 bg-customOrange text-white rounded-md hover:bg-[#f57b1d]"
                  >
                    Buat Tiket
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {allTickets.map((ticket) => (
                  <div
                    key={`ticket-${ticket.ticket_id}`}
                    className={`p-4 rounded-md border border-gray-200 hover:border-gray-300 ${
                      ticket.available <= 0 ? "opacity-50" : ""
                    }`}
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
                    <div className="flex justify-between items-start">
                      <div
                        className="flex-grow cursor-pointer"
                        onClick={() =>
                          ticket.available > 0 && setSelectedTicket(ticket)
                        }
                      >
                        <h3 className="font-semibold">{ticket.ticketName}</h3>
                        <p className="text-gray-600">
                          {formatToIDR(ticket.price)}
                        </p>
                        <p
                          className={`text-sm ${
                            ticket.available <= 0
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {ticket.available <= 0
                            ? "Habis Terjual"
                            : `Tersedia: ${ticket.available}`}
                        </p>
                      </div>
                      {user.isAuth && user.role === "ORGANIZER" && (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `/edit-ticket/${ticket.ticket_id}?eventId=${event.event_id}`
                              );
                            }}
                            className="p-2 text-customLightBlue hover:text-customMediumBlue"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (
                                window.confirm(
                                  "Apakah Anda yakin ingin menghapus tiket ini?"
                                )
                              ) {
                                try {
                                  await axios.delete(
                                    `http://localhost:3232/tickets/${ticket.ticket_id}`
                                  );
                                  setAllTickets((tickets) =>
                                    tickets.filter(
                                      (t) => t.ticket_id !== ticket.ticket_id
                                    )
                                  );
                                  if (
                                    selectedTicket?.ticket_id ===
                                    ticket.ticket_id
                                  ) {
                                    setSelectedTicket(null);
                                  }
                                } catch (err) {
                                  console.error(
                                    "Failed to delete ticket:",
                                    err
                                  );
                                  alert("Gagal menghapus tiket");
                                }
                              }
                            }}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Daftar Promosi</h2>
                {user.isAuth && user.role === "ORGANIZER" && (
                  <button
                    onClick={() =>
                      router.push(`/create-promotion?eventId=${event.event_id}`)
                    }
                    className="px-4 py-2 bg-customOrange text-white rounded-md hover:bg-[#f57b1d]"
                  >
                    Buat Promosi
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {promotions.length > 0 ? (
                  promotions.map((promo) => (
                    <div
                      key={promo.promotion_id}
                      className="p-4 border border-gray-200 rounded-md hover:border-gray-300"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">
                            Kode: {promo.promotionCode}
                          </h3>
                          <p className="text-gray-600">
                            {promo.type === "PERCENTAGE"
                              ? `${promo.value}% OFF`
                              : formatToIDR(promo.value)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Digunakan: {promo.useCount} dari {promo.maxUse}
                          </p>
                          <div className="text-xs text-gray-400 mt-1">
                            <p>
                              Mulai:{" "}
                              {new Date(promo.startDate).toLocaleDateString()}
                            </p>
                            <p>
                              Berakhir:{" "}
                              {new Date(
                                promo.expirationDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {user.isAuth && user.role === "ORGANIZER" && (
                          <button
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Yakin ingin menghapus promosi ini?"
                                )
                              ) {
                                try {
                                  await axios.delete(
                                    `http://localhost:3232/promotions/${promo.promotion_id}`
                                  );
                                  setPromotions(
                                    promotions.filter(
                                      (p) =>
                                        p.promotion_id !== promo.promotion_id
                                    )
                                  );
                                } catch (error) {
                                  console.error(
                                    "Failed to delete promotion:",
                                    error
                                  );
                                  alert("Gagal menghapus promosi");
                                }
                              }
                            }}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada promosi yang dibuat
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

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
              {user.isAuth && user.role === "CUSTOMER" && (
                <button
                  onClick={handleBuyTicket}
                  className="w-full py-3 bg-customMediumBlue text-white rounded-md hover:bg-customDarkBlue"
                >
                  Beli Tiket
                </button>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Pilih tiket untuk melihat detail.
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

          {/* review form */}
          {/* {user.isAuth && user.role === "CUSTOMER" && (
            <>
              <form onSubmit={handleSubmitReview} className="mb-8">
                <div className="mb-4">
                  <div className="flex gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="text-2xl"
                      >
                        <FaStar
                          className={
                            star <= (hoveredStar || newReview.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    className="w-full p-3 border rounded-md"
                    placeholder="Tulis review mu..."
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-customMediumBlue text-white rounded-md hover:bg-customDarkBlue"
                >
                  Kirim Review
                </button>
              </form>
            </>
          )} */}

          {/* reviews list */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {review.user.imgProfile ? (
                      <img
                        src={review.user.imgProfile}
                        alt={review.user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-customLightBlue text-white text-xl">
                        {review.user.username[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{review.user.username}</p>
                    {editingReview === review.id ? (
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setEditForm({ ...editForm, rating: star })
                            }
                            className="text-2xl"
                          >
                            <FaStar
                              className={
                                star <= editForm.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {review.userId ===
                    parseInt(localStorage.getItem("userId") || "0") && (
                    <div className="ml-auto flex gap-2">
                      {user.isAuth && user.role === "CUSTOMER" && (
                        <>
                          {editingReview === review.id ? (
                            <>
                              <button
                                onClick={() => handleUpdateReview(review.id)}
                                className="p-1 text-customMediumBlue hover:text-customDarkBlue flex items-center gap-1"
                                title="Save"
                              >
                                <FaSave />
                              </button>
                              <button
                                onClick={() => setEditingReview(null)}
                                className="p-1 text-gray-600 hover:text-gray-800 flex items-center gap-1"
                                title="Cancel"
                              >
                                <FaTimes />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditClick(review)}
                                className="p-1 text-customMediumBlue hover:text-customDarkBlue"
                                title="Edit review"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteReview(review.id)}
                                className="p-1 text-customOrange hover:text-red-800"
                                title="Delete review"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
                {editingReview === review.id ? (
                  <textarea
                    value={editForm.comment}
                    onChange={(e) =>
                      setEditForm({ ...editForm, comment: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
