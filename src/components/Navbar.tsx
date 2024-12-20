"use client";

import * as React from "react";
import Link from "next/link";
import { FaSearch, FaCalendarAlt, FaCompass, FaBars } from "react-icons/fa";
import { useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { callAPI } from "@/config/axios";
import { setSignIn } from "@/lib/redux/features/userSlice";
interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const keepLogin = async () => {
    try {
      const token = localStorage.getItem("tkn");
      if (token) {
        const response = await callAPI.get(`/user/keep-login`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("CHECK SIGN IN RESPONSE :", response.data);
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
          <h2>Eventra</h2>
        </div>
        <div className="hidden sm:flex sm:ml-auto space-x-4">
          <Link href="/about" className="text-white hover:underline">
            Tentang Eventra
          </Link>
          <Link href="/create-event" className="text-white hover:underline">
            Mulai Jadi Event Creator
          </Link>
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
          Eventra
        </div>

        <div className="flex-1 flex justify-center mt-4 sm:mt-0 sm:relative sm:top-0 relative top-[-15px]">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Cari event seru di sini"
              className="w-full px-4 py-2 rounded-l-md bg-[#060b40] text-white focus:outline-none"
            />
            <button className="absolute right-0 top-0 bottom-0 px-4 py-2 rounded-r-md bg-blue-500 text-white hover:bg-blue-600">
              <FaSearch className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          <Link
            href="/create-event"
            className="text-white flex items-center space-x-2 hover:underline"
          >
            <FaCalendarAlt className="w-5 h-5 text-white" />
            <span>Buat Event</span>
          </Link>
          <Link
            href="/explore"
            className="text-white flex items-center space-x-2 hover:underline"
          >
            <FaCompass className="w-5 h-5 text-white" />
            <span>Jelajah</span>
          </Link>
          <ul>
            <li className="flex gap-2">
              {user.email ? (
                <p className="text-white font-ibrand">{user.email}</p>
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
            <Link href="/create-event" className="text-white hover:underline">
              Mulai Jadi Event Creator
            </Link>
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
