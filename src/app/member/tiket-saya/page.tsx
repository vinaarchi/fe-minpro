"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";
import AuthGuard from "@/guard/AuthGuard";

interface DiscountCoupon {
  id: number;
  code: string;
  discount: number;
  expirationDate: string;
}

interface Transaction {
  id: number;
  ticketId: number;
  finalPrice: number;
  status: string;
  createdAt: string;
  ticket: {
    ticketName: string;
    eventId: number;
    event: {
      name: string;
      date: string;
      time: string;
      location: string;
      image: string;
    };
  };
}

export default function TicketSaya() {
  const [tickets, setTickets] = useState<Transaction[]>([]);
  const [discountCoupons, setDiscountCoupons] = useState<DiscountCoupon[]>([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // ini fungsi buat transaksi

  useEffect(() => {
    if (!userId) return;

    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/transactions/user/${userId}`
        );
        setTickets(response.data);
      } catch (err) {
        console.log("Failed to fetch tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthGuard allowedRoles={["CUSTOMER"]}>
      <div className="max-w-7xl mx-auto p-6">
        {/* ini bagian ticket */}

        <div>
          <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
          {tickets.length === 0 ? (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
              <FaTicketAlt className="text-4xl text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Tickets Found
              </h2>
              <p className="text-gray-500 mb-4">
                You haven&apos;t purchased any tickets yet.
              </p>
              <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {tickets.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={
                        transaction.ticket.event.image || "/default-event.jpg"
                      }
                      alt={transaction.ticket.event.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      {transaction.status}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {transaction.ticket.event.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">
                      {transaction.ticket.ticketName}
                    </p>

                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <FaCalendar className="mr-2" />
                        <span>
                          {format(
                            new Date(transaction.ticket.event.date),
                            "dd MMMM yyyy"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FaClock className="mr-2" />
                        <span>
                          {format(
                            new Date(transaction.ticket.event.time),
                            "HH:mm"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{transaction.ticket.event.location}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Paid Amount</span>
                        <span className="text-lg font-semibold">
                          Rp {transaction.finalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/review/${transaction?.ticket?.eventId}`}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
                  >
                    Tulis Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
