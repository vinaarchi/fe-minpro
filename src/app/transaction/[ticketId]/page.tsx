"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FaUpload, FaCreditCard } from "react-icons/fa";

interface Ticket {
  ticket_id: number;
  price: number;
  ticketName: string;
  available: number;
  description: string;
}

interface BankAccount {
  name: string;
  number: string;
  holder: string;
}

const BankAccounts: BankAccount[] = [
  { name: "BCA", number: "1234567890", holder: "PT Event Organizer" },
  { name: "Mandiri", number: "0987654321", holder: "PT Event Organizer" },
];

export default function TransactionPage() {
  const params = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        console.log("Fetching ticket with ID:", params.ticketId);
        const response = await axios.get<Ticket>(
          `http://localhost:3232/tickets/${params.ticketId}`
        );
        console.log("Ticket response:", response.data);
        setTicket(response.data);
        setFinalPrice(response.data.price);
      } catch (err) {
        console.error("Failed to fetch ticket:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.ticketId) {
      fetchTicket();
    }
  }, [params.ticketId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setPreviewUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const checkPromoCode = async () => {
    try {
      if (!ticket) return;

      const response = await axios.post(
        "http://localhost:3232/promotions/check",
        {
          code: promoCode,
          ticketId: params.ticketId,
        }
      );

      const { discount } = response.data;
      setDiscount(discount);
      setFinalPrice(ticket.price - discount);
    } catch (err) {
      console.error("Invalid promo code:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!proofImage || !ticket) return;

      const reader = new FileReader();
      reader.readAsDataURL(proofImage);

      reader.onload = async () => {
        const base64Image = reader.result;

        const payload = {
          ticketId: params.ticketId,
          userId: 2, //demo
          promoCode,
          finalPrice,
          proofImage: base64Image,
        };

        const response = await axios.post(
          "http://localhost:3232/transactions",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          alert("Transaction successful!");
          router.push("/my-tickets");
        }
      };
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Transaction failed. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Details</h2>

            <div className="space-y-4">
              {BankAccounts.map((account) => (
                <div key={account.number} className="border p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaCreditCard />
                    <span className="font-semibold">{account.name}</span>
                  </div>
                  <p className="text-lg font-mono mt-2">{account.number}</p>
                  <p className="text-sm text-gray-600">{account.holder}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="border rounded px-3 py-2 flex-grow"
                  placeholder="Enter promo code"
                />
                <button
                  onClick={checkPromoCode}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Upload Payment Proof</h2>

            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="proofUpload"
                accept="image/*"
              />
              <label htmlFor="proofUpload" className="cursor-pointer block p-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Payment proof"
                    className="max-w-full h-auto mx-auto"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <FaUpload className="text-3xl mb-2" />
                    <p>Click to upload payment proof</p>
                  </div>
                )}
              </label>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Ticket Price</span>
                <span>Rp {ticket.price.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- Rp {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>Rp {finalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
