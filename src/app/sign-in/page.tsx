/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormInput from "@/components/FormInput";
import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import { setSignIn } from "@/lib/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { callAPI } from "@/config/axios";

const SignIn: React.FunctionComponent<any> = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSignIn = async () => {
    try {
      const response = await callAPI.post(`/user/sign-in`, { email, password });
      console.log("CHECK SIGNIN RESPONSE :", response.data);
      dispatch(setSignIn({ ...response.data, isAuth: true }));
      localStorage.setItem("tkn", response.data.token);
      localStorage.setItem("userId", response.data.id);
      console.log("ini id dari frontend", response.data);

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center p-5">
          <Image
            src="/images/sign-in.png"
            alt="Logo"
            width={500}
            height={100}
          />
          <h3 className="font-ibrand text-4xl text-customMediumBlue">
            Selamat Datang Kembali!
          </h3>
          <p>Login sekarang dan nikmati fitur menarik yang sudah menunggumu!</p>
        </div>
        <div className="flex justify-center m-24">
          <Card className="w-[450px] p-12">
            <h1 className="font-ibrand text-4xl text-customDarkBlue text-center">
              Masuk ke akunmu
            </h1>
            <div className="flex justify-center text-center mb-5">
              <p>Tidak punya akun Eventra?</p>
              <a href="/sign-up" className="text-customLightBlue">
                Daftar Sekarang!
              </a>
            </div>
            <div className="space-y-5">
              <FormInput
                name="email"
                type="text"
                label="Email"
                placeholder="Enter Your Email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <FormInput
                name="password"
                type="password"
                label="Password"
                placeholder="Type Your Password"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center p-5">
              <Button
                type="submit"
                className="bg-customLightBlue text-white rounded-full shadow"
                onClick={onSignIn}
              >
                Login Sekarang
              </Button>
            </div>
            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-sm hover:text-customOrange"
              >
                Forgot Password?
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
