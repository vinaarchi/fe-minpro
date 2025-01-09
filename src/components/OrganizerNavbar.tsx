"use client";

import * as React from "react";
import Link from "next/link";
import { FaCalendarAlt, FaCompass } from "react-icons/fa";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuArrow,
} from "@radix-ui/react-dropdown-menu";
import AuthGuard from "@/guard/AuthGuard";

const NavbarOrganizer = () => {
  const handleLogout = () => {
    localStorage.removeItem("tkn");
    window.location.href = "/";
  };
  return (
    <AuthGuard allowedRoles={["ORGANIZER"]}>
      <Link
        href="/create-event"
        className="text-white flex items-center space-x-2 hover:underline"
      >
        <FaCalendarAlt className="w-5 h-5 text-white" />
        <span>Buat Event</span>
      </Link>

      <Link
        href="/events"
        className="text-white flex items-center space-x-2 hover:underline"
      >
        <FaCompass className="w-5 h-5 text-white" />
        <span>Jelajah</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="hover:bg-customLightBlue bg-customDarkBlue">
            <span>Organizer Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute-[100%] text-white bg-customDarkBlue rounded-md text-center">
          <DropdownMenuArrow />
          <DropdownMenuItem className="p-2 rounded-md text-xs">
            <Link href="/organizer/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-md text-xs">
            <Link href="/member/event-list">Event Saya</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-md text-xs">
            <Link href="/organizer/informasi-dasar">Informasi Dasar</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-md text-xs">
            <Link href="/organizer/pengaturan">Pengaturan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-md text-xs font-bold text-customOrange">
            <button onClick={handleLogout}>Keluar</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </AuthGuard>
  );
};

export default NavbarOrganizer;
