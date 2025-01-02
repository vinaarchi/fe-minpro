"use client";

import * as React from "react";
import { useState } from "react";
import { callAPI } from "@/config/axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { set } from "lodash";

const ResetPassword: React.FunctionComponent = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const onResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Password do not match");
      return;
    }

    const token = searchParams.get("a_t");
    try {
      const response = await callAPI.patch(
        "/user/reset-password",
        {
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setMessage(response.data.message);
        setTimeout(() => router.push("/sign-in"), 3000);
      } else {
        setMessage("Failed to reset password");
      }
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message || "An error occured");
    }
  };
  return (
    <div className="px-24 py-14 bg-white h- flex items-center justify-center">
      <div className="w-1/2 h-fit rounded-2xl px-10 py-8 bg-customLightBlue">
        <h1 className="text-3xl font-ibrand text-white">Reset Password</h1>
        <div className="py-6 space-y-5">
          <div>
            <label htmlFor="newPassword" className="block text-white">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 border rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {message && <p className="text-customOrange">{message}</p>}
          <Button
            className="bg-customDarkBlue text-white px-4 py-2 rounded-full shadow"
            onClick={onResetPassword}
          >
            Reset Now
          </Button>
        </div>
      </div>
      <div>
        <Image
          src="/images/reset-pass.png"
          alt="logo reset"
          width={500}
          height={100}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
