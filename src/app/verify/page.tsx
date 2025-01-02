"use client";

import { useSearchParams } from "next/navigation";
import * as React from "react";
import { callAPI } from "@/config/axios";
import Image from "next/image";

interface IVerifyProps {}

const Verify: React.FunctionComponent<IVerifyProps> = (props) => {
  const queryParams = useSearchParams();
  const handleVerified = async () => {
    try {
      console.log(queryParams.get("a_t"));
      const res = await callAPI.patch("/user/verify-account", null, {
        headers: {
          Authorization: `Bearer ${queryParams.get("a_t")}`,
        },
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    handleVerified();
  }, []);
  return (
    <div>
<div className="flex justify-center pt-10">
  <Image 
  src="/images/verified.png"
  alt="logo verify"
  width={400}
  height={100}
  />
</div>
    <div className="text-center m-10">
      <p className=" p-10 font-ibrand text-5xl text-customMediumBlue">
        Akun Anda Telah Sukses di Verifikasi
      </p>
      <a
        href="/sign-in"
        className="font-serif text-customLightBlue hover:text-customOrange text-xl"
      >
        Login Sekarang Klik Link Disini
      </a>
    </div>
    </div>
  );
};

export default Verify;
