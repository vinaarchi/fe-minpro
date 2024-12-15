"use client";

import React from "react";

const Footer = () => {
  return (
    <div className="bg-customDarkBlue p-10">
      <div className="grid grid-cols-2 md:grid-cols-3 justify-evenly">
        <div className="text-white space-y-4 text-center">
          <h3 className="font-ibrand text-3xl">Tentang Eventra</h3>
          <ul className="space-y-3">
            <li>
              <a>Masuk</a>
            </li>
            <li>
              <a>Lihat Event</a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>Syarat dan Ketentuan</a>
            </li>
          </ul>
        </div>
        <div className="text-white text-center space-y-4">
          <h3 className="font-ibrand text-3xl">Lokasi Eventra</h3>
          <ul className="space-y-3">
            <li>
              <a>Jakarta</a>
            </li>
            <li>
              <a>Bandung</a>
            </li>
            <li>
              <a>Yogyakarta</a>
            </li>
            <li>
              <a>Surayaba</a>
            </li>
            <li>
              <a>Semua Kota</a>
            </li>
          </ul>
        </div>
        <div className="text-white text-center space-y-4">
          <h3 className="font-ibrand text-3xl">Inspirasi Eventra</h3>
          <ul className="space-y-3">
            <li>
              <a>Festival</a>
            </li>
            <li>
              <a>Olahraga</a>
            </li>
            <li>
              <a>Konser</a>
            </li>
            <li>
              <a>Teater & Drama</a>
            </li>
            <li>
              <a>Semua Kategori</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
