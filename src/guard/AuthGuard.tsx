"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import * as React from "react";
import { useEffect, ReactNode, useState } from "react";

type Role = "CUSTOMER" | "ORGANIZER";

interface IAuthGuardProps {
  children: ReactNode;
  allowedRoles: Role[];
}

const AuthGuard: React.FunctionComponent<IAuthGuardProps> = ({
  children,
  allowedRoles,
}) => {
  //ngambil data user dari redux
  const userData = useAppSelector((state) => state.userReducer);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!userData) {
      return; // tunggu sampe data user dimuat
    }

    //jika data udah tersedia, set Loading ke false
    setLoading(false);

    // cek apakah user memiliki role yang sesuai
    if (!allowedRoles.includes(userData.role as Role)) {
      redirect("/");
      return;
    }
  }, [userData, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>; // Atau spinner/komponen loading lainnya
  }

  return <>{children}</>;
};

export default AuthGuard;
