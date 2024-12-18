"use client";

import Image from "next/image";
import FormInput from "@/components/FormInput";
import { Formik, Form, FormikProps } from "formik";
import { ISignUpValue } from "./type";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { error } from "console";
import { callAPI } from "@/config/axios";
import Footer2 from "@/components/Footer2";
import { SignUpSchema } from "./SignUpSchema";

interface ISignUpPageProps {}
interface FormValue {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "ORGANIZER";
}

const signUp: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const onSignUp = async (values: FormValue) => {
    try {
      const res = await callAPI.post("/user/sign-up", {
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-customDarkBlue p-8 shadow-md">
        <h1 className="font-ibrand text-center text-white text-5xl ">
          <a href="/">Eventra</a>
        </h1>
      </div>
      <div className="m-8 p-10">
        <div className="flex justify-center m-5">
          <div className="flex flex-col items-center p-5">
            <Image
              src="/images/signup.png"
              alt="Logo"
              width={500}
              height={100}
              className=""
            />
            <h3 className="font-ibrand text-4xl">
              Tidak lagi ketinggalan event favoritmu
            </h3>
            <p>
              Gabung sekarang dan rasakan kemudahan bertransaksi dan mengelola
              event di Eventra
            </p>
          </div>
          <div className="space-y-5">
            <Card className="w-[500px] p-12">
              <h1 className="font-ibrand text-3xl text-customDarkBlue text-center">
                Buat akunmu sekarang juga !
              </h1>
              <div className="flex justify-center text-center mb-5 space-x-2">
                <p>Sudah punya akun?</p>
                <a href="/sign-in" className="text-customLightBlue">
                  Masuk!
                </a>
              </div>
              <CardContent>
                <Formik
                  validationSchema={SignUpSchema}
                  initialValues={{
                    fullname: "",
                    username: "",
                    email: "",
                    password: "",
                    role: "CUSTOMER",
                  }}
                  onSubmit={(values: FormValue, { resetForm }) => {
                    console.log("Values from input formik :", values);
                    onSignUp(values);
                    resetForm();
                  }}
                >
                  {(props: FormikProps<FormValue>) => {
                    const { values, handleChange, errors, touched } = props;
                    console.log("error formik", errors);

                    return (
                      <Form>
                        <div>
                          <FormInput
                            name="fullname"
                            type="text"
                            label="First name"
                            onChange={handleChange}
                            value={values.fullname}
                          />
                          <FormInput
                            name="username"
                            type="text"
                            label="Username"
                            onChange={handleChange}
                            value={values.username}
                          />
                          <FormInput
                            name="email"
                            type="text"
                            label="Email"
                            onChange={handleChange}
                            value={values.email}
                          />
                          <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            onChange={handleChange}
                            value={values.password}
                          />
                          <div className="mt-4">
                            <label htmlFor="role" className="font-bold">
                              Role
                            </label>
                            <select
                              name="role"
                              id="role"
                              value={values.role}
                              onChange={handleChange}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-customMediumBlue focus:border-black sm:text-sm"
                            >
                              <option value="CUSTOMER">Customer</option>
                              <option value="ORGANIZER">Organizer</option>
                            </select>
                          </div>
                          <div className="flex justify-center items-center gap-4 p-5">
                            <Button
                              type="submit"
                              className="bg-customMediumBlue text-white px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full shadow"
                            >
                              Sign Up
                            </Button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default signUp;
