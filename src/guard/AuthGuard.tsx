"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import * as React from "react";
import { useEffect, ReactNode } from "react";

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

  useEffect(() => {
    if (!userData) {
      return; // tunggu sampe data user dimuat
    }

    // cek apakah user memiliki role yang sesuai
    if (!allowedRoles.includes(userData.role as Role)) {
      redirect("/");
      return;
    }
  }, [userData, allowedRoles]);

  return <>{children}</>;
};

export default AuthGuard;
