"use client";

import CusSidebar from "@/components/CustSidebar";
import AuthGuard from "@/guard/AuthGuard";
import * as React from "react";

const TiketSaya = () => {
  return (
    <AuthGuard allowedRoles={["CUSTOMER"]}>
      <div>
        <div className="flex">
          <CusSidebar />
          <div>
            <p>Ini cuma contoh</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default TiketSaya;
