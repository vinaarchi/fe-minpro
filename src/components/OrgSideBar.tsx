"use client";

import * as React from "react";
import Link from "next/link";
import AuthGuard from "@/guard/AuthGuard";

const OrgSidebar = () => {
  return (
    <div
      style={{
        width: "300px",
        height: "100vh",
        backgroundColor: "#2d3250",
        paddingTop: "20px",
        paddingBottom: "100px",
      }}
    >
      <AuthGuard allowedRoles={["ORGANIZER"]}>
        <ul className="text-white font-serif space-y-5 text-center text-xl pt-10">
          <li>
            <Link href="/member/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/member/event-list">Event Saya</Link>
          </li>
          <li>
            <Link href="/organizer/rekening">Rekening</Link>
          </li>
          <li>
            <Link href="/organizer/informasi-dasar">Informasi Dasar</Link>
          </li>
          <li>
            <Link href="/organizer/pengaturan">Pengaturan</Link>
          </li>
        </ul>
      </AuthGuard>
    </div>
  );
};

export default OrgSidebar;
