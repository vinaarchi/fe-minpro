"use client";

import * as React from "react";
import Link from "next/link";

const CusSidebar = () => {
  return (
    <div
      style={{
        width: "300px",
        height: "100vh",
        backgroundColor: "#2d3250",
        paddingTop: "20px",
        paddingBottom: "100px"
      }}
    >
      <ul className="text-white font-serif space-y-5 text-center text-xl pt-10">
        <li>
          <Link href="/event-detail">Jelajah Event</Link>
        </li>
        <li>
          <Link href="/member/tiket-saya">Tiket Saya</Link>
        </li>
        <li>
          <Link href="/member/informasi-dasar">Informasi Dasar</Link>
        </li>
        <li>
          <Link href="/member/pengaturan">Pengaturan</Link>
        </li>
      </ul>
    </div>
  );
};

export default CusSidebar;
