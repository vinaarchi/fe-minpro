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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const signUp = () => {
  return (
    <div>
      <div className="bg-customDarkBlue p-8 shadow-md">
        <h1 className="font-ibrand text-center text-white text-5xl ">
          <a href="/">Eventra</a>
        </h1>
      </div>
      <div className="flex justify-center m-24">
        <div className="flex flex-col items-center p-5">
          <Image
            src="/images/signup.png"
            alt="Logo"
            width={500}
            height={100}
            className=""
          />
          <h3 className="font-ibrand text-4xl">
            Tidak lagi ketinggalan event favoritmu
          </h3>
          <p>
            Gabung sekarang dan rasakan kemudahan bertransaksi dan mengelola
            event di Eventra
          </p>
        </div>
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="font-congrates font-light text-2xl">
              Create Your Personal Account
            </CardTitle>
            <CardDescription>Please Enter Your Personal Info</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Fullname</Label>
                  <Input id="name" placeholder="Enter your fullname" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" placeholder="Enter your username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input id="name" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input id="name" placeholder="Enter your password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Pick a Role</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Customer</SelectItem>
                      <SelectItem value="sveltekit">Organizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Create Now</Button>
          </CardFooter>
          <div className="text-center mb-5">
            <a href="/sign-in" className="hover:text-customOrange">
              Already have account? Sign In Now
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default signUp;
