"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import * as React from "react";

interface IAuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FunctionComponent<IAuthGuardProps> = ({ children }) => {
  const userData = useAppSelector((state) => state.userReducer);
  React.useEffect(() => {
    if (Object.hasOwn(userData, "isAuth")) {
      if (!userData?.isAuth) {
        redirect("/");
      }
    }
  }, [userData]);
  return children;
};

export default AuthGuard;
