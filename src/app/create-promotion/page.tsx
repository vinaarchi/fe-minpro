"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

// export default function CreatePromotion() {
const PromotionForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [formData, setFormData] = useState({
    type: "PERCENTAGE",
    value: 0,
    promotionCode: "",
    startDate: "",
    expirationDate: "",
    maxUse: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3232/promotions`, {
        ...formData,
        eventId: Number(eventId),
        value: Number(formData.value),
        maxUse: Number(formData.maxUse),
      });

      router.push(`/event/${eventId}?promotionCreated=true`);
    } catch (error) {
      console.error("Failed to create promotion:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Buat Kode Promosi</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Tipe Promosi</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option value="PERCENTAGE">Persentase</option>
            <option value="FLAT">Nominal Tetap</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">
            {formData.type === "PERCENTAGE"
              ? "Persentase Diskon"
              : "Nominal Diskon"}
          </label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: Number(e.target.value) })
            }
            className="w-full p-2 border rounded-md"
            min="0"
            max={formData.type === "PERCENTAGE" ? "100" : undefined}
          />
        </div>

        <div>
          <label className="block mb-2">Kode Promosi</label>
          <input
            type="text"
            value={formData.promotionCode}
            onChange={(e) =>
              setFormData({ ...formData, promotionCode: e.target.value })
            }
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Tanggal Mulai</label>
          <input
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Tanggal Berakhir</label>
          <input
            type="datetime-local"
            value={formData.expirationDate}
            onChange={(e) =>
              setFormData({ ...formData, expirationDate: e.target.value })
            }
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Maksimal Penggunaan</label>
          <input
            type="number"
            value={formData.maxUse}
            onChange={(e) =>
              setFormData({ ...formData, maxUse: Number(e.target.value) })
            }
            className="w-full p-2 border rounded-md"
            min="1"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-customMediumBlue text-white rounded-md hover:bg-customDarkBlue"
          >
            Buat Promosi
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default function CreatePromotion() {
  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Buat Kode Promosi</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PromotionForm />
      </Suspense>
    </div>
  );
}
