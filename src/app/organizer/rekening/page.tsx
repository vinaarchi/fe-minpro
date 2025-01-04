"use client";

import AuthGuard from "@/guard/AuthGuard";
import * as React from "react";
import { useEffect, useState } from "react";

const RekeningPage: React.FC = () => {
  return (
    <div>
      <AuthGuard allowedRoles={["ORGANIZER"]}>
        <p>Ini halaman rekening</p>
      </AuthGuard>
    </div>
  );
};

export default RekeningPage;
