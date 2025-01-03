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
  fullname: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  imgProfile: File | null;
}

const CustomerEditProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [userId, setUserId] = useState<number>(0);
  const [initialValues, setInitialValues] = useState<IFormValues>({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    imgProfile: null,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));

      //ambil data user dari localstorage
      const fetchUserProfile = async () => {
        try {
          const response = await callAPI.get(
            `http://localhost:3232/user/data-user/${storedUserId}`
          );
          const userData = response.data.result;

          //set initial values
          setInitialValues({
            fullname: userData.fullname,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            gender: userData.gender,
            imgProfile: userData.imgProfile,
          });

          // console.log("INI USER DATANYA", userData);
          console.log("INI INITIALVALUESNYA", initialValues);
        } catch (error) {
          console.log("Error fetching user profile", error);
        }
      };
      fetchUserProfile();
    }
    console.log("Stored user id", storedUserId);
  }, []);

  const validationSchema = customerValidationSchema;

  const onUpdateProfile = async (values: IFormValues) => {
    console.log("Sending update request with data", values);

    try {
      if (userId) {
        const response = await callAPI.patch(
          `http://localhost:3232/user/update/${userId}`,
          values
        );
        console.log(" Akun berhasil diupdate", response.data);

        // update data user di reduxnya
        dispatch(setUpdateProfile(response.data));

        //nyimpen kembali data yang ke update ke localstorage
        localStorage.setItem("userId", response.data.id);

        alert("Akun berhasil diupdate");

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
                console.log("Form submitted", values);

                onUpdateProfile(values);
              }}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-5">
                  <div>
                    <label htmlFor="fullname" className="text-2xl">
                      Fullname
                    </label>
                    <Field
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Nama Lengkap Kamu"
                      value={initialValues.fullname}
                      // onChange={(e: any) => {
                      //   setInitialValues({
                      //     ...initialValues,
                      //     fullname: e.target.value,
                      //   });
                      // }}
                      className="w-full border-2 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="text-2xl">
                      Username
                    </label>
                    <Field
                      id="username"
                      name="username"
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

                    <div>
                      <label htmlFor="profilePicture" className="text-2xl">
                        Profile Picture
                      </label>
                      <input
                        id="imgProfile"
                        name="imgProfile"
                        type="file"
                        onChange={(event: any) => {
                          setFieldValue(
                            "imgProfile",
                            event.currentTarget.files[0]
                          );
                        }}
                        className="w-full border-2 rounded-md p-2"
                      />
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
