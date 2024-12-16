"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signIn = () => {
  return (
    <div>
      <div className="bg-customDarkBlue p-8 shadow-md">
        <h1 className="font-ibrand text-center text-white text-5xl ">
          <a href="/">Eventra</a>
        </h1>
      </div>
      <div className="flex justify-center m-24">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="font-congrates font-light text-2xl">
              Enter Your Personal Account
            </CardTitle>
            <CardDescription>Please Enter Your Email Info</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input id="name" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input id="name" placeholder="Enter your password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Login Now</Button>
          </CardFooter>
          <div className="text-center">
            <a
              href="/forgot-password"
              className=" hover:text-customOrange"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center mb-5">
            <a href="/sign-up" className="hover:text-customOrange">
              Don't have any account?
            </a>
          </div>
        </Card>
        <div className="flex flex-col items-center p-5">
          <Image
            src="/images/signin.png"
            alt="Logo"
            width={500}
            height={100}
            className=""
          />
          <h3 className="font-ibrand text-4xl">
          Selamat Datang Kembali!
          </h3>
          <p>
          Login sekarang dan nikmati fitur menarik yang sudah menunggumu!
          </p>
        </div>
      </div>
    </div>
  );
};

export default signIn;
