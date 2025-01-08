/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useState } from "react";
import { callAPI } from "@/config/axios";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ForgotPassword: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // const router = useRouter();

  const onForgotPassword = async () => {
    try {
      const response = await callAPI.post("/user/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };
  return (
    <div className="px-24 py-14 bg-white flex flex-row items-center justify-center">
      <div>
        <Image
          src="/images/forgot-password.png"
          alt="logo forget"
          width={500}
          height={100}
        />
      </div>
      <div className="w-1/2 h-fit rounded-2xl px-10 oy-8 bg-customLightBlue shadow-md">
        <h1 className="text-2xl font-ibrand text-white pt-5">
          Forgot Password
        </h1>
        <p className="text-sm text-white">
          Enter your email to receive password reset instructions
        </p>
        <div className="py-6 space-y-5 ">
          <FormInput
            name="email"
            type="email"
            placeholder="Input your email here"
            onChange={(e: any) => setEmail(e.target.value)}
          />
          {message && <p className="text-customOrange">{message}</p>}
          <Button
            className="bg-customDarkBlue text-white px-4 py-2 rounded-full shadow"
            onClick={onForgotPassword}
          >
            Send Reset Instructions
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default ForgotPassword;
