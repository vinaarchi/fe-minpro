"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const CustomerSettings = () => {
  const handleDeleteUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("User ID", userId);

      const response = await axios.delete(
        `http://localhost:3232/user/delete/${userId}`
      );
      console.log("Delete user", response.data);
      localStorage.removeItem("userId");
      alert("Akun berhasil dihapus");
      window.location.href = "/sign-in";
    } catch (error) {
      console.log("Error delete user", error);
      alert("Gagal menghapus akun. Silahkan coba lagi");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-96">
      <div className="flex flex-col items-center space-y-5 p-10 bg-white rounded-lg shadow-lg">
        <div>
          <Image
            src="/images/delete.png"
            alt="delete"
            width={500}
            height={200}
          />
        </div>
        <div className=" justify-center text-center">
          <h1 className="text-3xl">Customer Settings</h1>
          <p className="text-xl">Ini adalah halaman pengaturan customer</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleDeleteUser}
            className="border p-2 rounded-md hover:bg-customMediumBlue bg-customDarkBlue text-white"
          >
            Hapus Akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSettings;
