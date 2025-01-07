"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type PromotionForm = {
  eventId: number;
  type: "PERCENTAGE" | "FLAT";
  value: number;
  promotionCode: string;
  startDate: string;
  expirationDate: string;
  maxUse: number;
};

export default function CreatePromotion() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromotionForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const promotionType = watch("type");
  const promotionValue = watch("value");

  const createPromotion = async (data: PromotionForm) => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("http://localhost:3232/promotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          eventId: Number(data.eventId),
          type: data.type,
          value: Number(data.value),
          promotionCode: data.promotionCode.toUpperCase(),
          startDate: new Date(data.startDate).toISOString(),
          expirationDate: new Date(data.expirationDate).toISOString(),
          maxUse: Number(data.maxUse),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create promotion");
      }

      router.push("/dashboard/promotions");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const previewDiscount = () => {
    if (!promotionValue) return "0";
    const samplePrice = 100;

    if (promotionType === "PERCENTAGE") {
      return `${promotionValue}% (${
        (samplePrice * promotionValue) / 100
      } off ${samplePrice})`;
    }
    return `${promotionValue} flat amount`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Create Promotion</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit(createPromotion)} className="space-y-6">
        <div>
          <label className="block mb-2">Event ID</label>
          <input
            type="number"
            {...register("eventId", { required: "Event ID is required" })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.eventId && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.eventId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2">Promotion Type</label>
          <select
            {...register("type")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="PERCENTAGE">Percentage Discount</option>
            <option value="FLAT">Flat Amount</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Value {promotionType === "PERCENTAGE" ? "(%" : "(Amount"})
          </label>
          <input
            type="number"
            {...register("value", {
              required: "Value is required",
              min: {
                value: 0,
                message: "Value must be positive",
              },
              max: {
                value: promotionType === "PERCENTAGE" ? 100 : 1000000,
                message:
                  promotionType === "PERCENTAGE"
                    ? "Percentage cannot exceed 100%"
                    : "Amount cannot exceed 1,000,000",
              },
            })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.value && (
            <p className="text-red-500 mt-1 text-sm">{errors.value.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Preview: {previewDiscount()}
          </p>
        </div>

        <div>
          <label className="block mb-2">Promotion Code</label>
          <input
            {...register("promotionCode", {
              required: "Promotion code is required",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Only letters and numbers allowed",
              },
            })}
            className="w-full p-2 border rounded uppercase focus:ring-2 focus:ring-blue-500"
            placeholder="SUMMER2025"
          />
          {errors.promotionCode && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.promotionCode.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Start Date</label>
            <input
              type="datetime-local"
              {...register("startDate", { required: "Start date is required" })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.startDate && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2">Expiration Date</label>
            <input
              type="datetime-local"
              {...register("expirationDate", {
                required: "Expiration date is required",
              })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.expirationDate && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.expirationDate.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2">Maximum Uses</label>
          <input
            type="number"
            {...register("maxUse", {
              required: "Maximum uses is required",
              min: {
                value: 1,
                message: "Must allow at least one use",
              },
            })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.maxUse && (
            <p className="text-red-500 mt-1 text-sm">{errors.maxUse.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg 
                   hover:bg-blue-600 transition duration-200 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Promotion"}
        </button>
      </form>
    </div>
  );
}
