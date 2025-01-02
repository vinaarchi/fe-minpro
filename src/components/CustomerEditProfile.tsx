"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { customerValidationSchema } from "./EditProfile/validation/customerValidationSchema";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { callAPI } from "@/config/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUpdateProfile } from "@/lib/redux/features/userSlice";
import { parse } from "path";

interface IFormValues {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  gender: string;
  profilePicture: File | null;
}

const CustomerEditProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  console.log("CHECK DISPATCH REDUX", dispatch);

  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const initialValues: IFormValues = {
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    gender: "",
    profilePicture: null,
  };

  const validationSchema = customerValidationSchema;

  const onUpdateProfile = async (values: IFormValues) => {
    console.log("Updating profile", values);
    try {
      if (userId) {
        const response = await callAPI.patch(`/user/update/${userId}`, values);
        console.log(" Akun berhasil diupdate", response.data);

        // update data user di reduxnya
        dispatch(setUpdateProfile(response.data));

        //nyimpen kembali data yang ke update ke localstorage
        localStorage.setItem("userId", response.data.id);
        router.push("/member/informasi-dasar");
      }
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  return (
    <div>
      <div className="p-10 space-y-5">
        <h1 className="text-5xl">Edit Profile</h1>
        <p className="text-3xl"> Update your Profile Now</p>
      </div>
      <div className="p-10">
        <Card className="w-[500px] p-12">
          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                onUpdateProfile(values);
              }}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-5">
                  <div>
                    <label htmlFor="fullname" className="text-2xl">
                      Nama Lengkap
                    </label>
                    <Field
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Nama Lengkap Kamu"
                      className="w-full border-2 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="userName" className="text-2xl">
                      Nama Panggilan
                    </label>
                    <Field
                      id="userName"
                      name="userName"
                      type="text"
                      placeholder="Nama Panggilan Kamu"
                      className="w-full border-2 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-2xl">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email Kamu"
                      className="w-full border-2 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-2xl">
                      Nomor Telepon
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Nomor Telepon Kamu"
                      className="w-full border-2 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="text-2xl ">Jenis Kelamin</label>
                    <div className="space-x-8 ">
                      <label>
                        <Field type="radio" name="gender" value="male" />
                        Laki-laki
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="female" />
                        Perempuan
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="other" />
                        Lainnya
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-customLightBlue text-white"
                    >
                      Simpen Perubahan
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerEditProfile;
