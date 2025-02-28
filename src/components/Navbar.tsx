/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { FaSearch, FaCalendarAlt, FaCompass, FaBars } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { callAPI } from "@/config/axios";
import { setSignIn } from "@/lib/redux/features/userSlice";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuArrow,
} from "@radix-ui/react-dropdown-menu";

const Navbar: React.FunctionComponent<any> = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchQuery);
  const user = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  //ini buat logout nya
  const handleLogout = () => {
    localStorage.removeItem("tkn");
    dispatch(setSignIn({ isAuth: false }));
    router.push("/");
  };

  //search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedTerm)}`);
    }
  }, [debouncedTerm, router]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    },
    [searchQuery, router]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const keepLogin = async () => {
    try {
      const token = localStorage.getItem("tkn");

      if (token) {
        const response = await callAPI.get(`/user/keep-login`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("CHECK NAVBAR KEEPLOGIN SIGN IN RESPONSE :", response.data);
        dispatch(setSignIn({ ...response.data, isAuth: true }));
        localStorage.setItem("tkn", response.data.token);
      } else {
        dispatch(setSignIn({ isAuth: false }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    keepLogin();
  }, []);
  return (
    <>
      <nav className="flex justify-between items-center bg-customLightBlue px-4 sm:px-6 py-3 top-0 z-50 w-full text-sm">
        {/*hamburger*/}
        <button className="text-white sm:hidden" onClick={toggleMobileMenu}>
          <FaBars className="w-6 h-6" />
        </button>
        <div className="sm:hidden text-white font-ibrand text-lg">
          <Link href="/">Eventra</Link>
        </div>
        <div className="hidden sm:flex sm:ml-auto space-x-4">
          <Link href="/tentang" className="text-white hover:underline">
            Tentang Eventra
          </Link>
          {/* <Link href="/create-event" className="text-white hover:underline">
          Mulai Jadi Event Creator
        </Link> */}
          <Link href="/prices" className="text-white hover:underline">
            Biaya
          </Link>
          <Link href="/contact-us" className="text-white hover:underline">
            Hubungi kami
          </Link>
        </div>
      </nav>

      <nav className="flex flex-col sm:flex-row items-center bg-customMediumBlue px-4 sm:px-6 py-6 w-full text-lg">
        <div className="hidden sm:block text-white font-ibrand text-4xl">
          <Link href="/">Eventra</Link>
        </div>
        {/* search */}
        <div className="flex-1 flex justify-center mt-4 sm:mt-0 sm:relative sm:top-0 relative top-[-15px]">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari event seru di sini"
              className="w-full px-4 py-2 rounded-l-md bg-[#060b40] text-white focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-4 py-2 rounded-r-md bg-blue-500 text-white hover:bg-blue-600"
            >
              <FaSearch className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>

        <div className="hidden sm:flex items-center space-x-4 z-10">
          {/* ini menu berdasarkan rolenya nnti */}
          {user.isAuth && user.role === "ORGANIZER" && (
            <>
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
            </>
          )}

          {user.isAuth && user.role === "CUSTOMER" && (
            <>
              <Link
                href="/member/tiket-saya"
                className="text-white flex items-center space-x-2 hover:underline"
              >
                <FaCalendarAlt className="w-5 h-5 text-white" />
                <span>Tiket Saya</span>
              </Link>
              <Link
                href="/events"
                className="text-white flex items-center space-x-2 hover:underline"
              >
                <FaCompass className="w-5 h-5 text-white" />
                <span>Jelajah</span>
              </Link>
            </>
          )}

          <ul>
            <li className="flex gap-2">
              {user.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="hover:bg-customLightBlue bg-customDarkBlue">
                      <span>{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute-[100%] text-white bg-customDarkBlue rounded-md text-center">
                    <DropdownMenuArrow />

                    {user.isAuth && user.role === "ORGANIZER" && (
                      <>
                        <DropdownMenuItem className="p-2 rounded-md text-xs">
                          <Link href="/organizer/dashboard">Dashboard</Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem className="p-2 rounded-md text-xs">
                          <Link href="/member/event-list">Event Saya</Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="p-2 rounded-md text-xs">
                          <Link href="/organizer/informasi-dasar">
                            Informasi Dasar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 rounded-md text-xs">
                          <Link href="/organizer/pengaturan">Pengaturan</Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    {/* ini buat role customer dropdown */}

                    {user.isAuth && user.role === "CUSTOMER" && (
                      <>
                        <DropdownMenuItem className="p-2 rounded-md text-xs">
                          <Link href="/events">Jelajah</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 rounded-md text-xs">
                          <Link href="/member/tiket-saya">Tiket Saya</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 rounded-md text-xs">
                          <Link href="/member/informasi-dasar">
                            Informasi Dasar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 rounded-md text-xs">
                          <Link href="/member/pengaturan">Pengaturan</Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuItem className="p-2 rounded-md text-xs font-bold text-customOrange">
                      <button onClick={handleLogout}>Keluar</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <button className="bg-[#2d3250] text-white px-4 py-2 rounded-md border-[1px] border-white">
                    <a href="/sign-up" className="font-ibrand">
                      Daftar
                    </a>
                  </button>
                  <button className="bg-[#676f9d] text-white px-4 py-2 rounded-md">
                    <a href="/sign-in" className="font-ibrand">
                      Masuk
                    </a>
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden flex flex-col space-y-2 mt-4">
            <Link href="/about" className="text-white hover:underline">
              Tentang Eventra
            </Link>
            {/* <Link href="/create-event" className="text-white hover:underline">
              Mulai Jadi Event Creator
            </Link> */}
            <Link href="/prices" className="text-white hover:underline">
              Biaya
            </Link>
            <Link href="/contact-us" className="text-white hover:underline">
              Hubungi kami
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
