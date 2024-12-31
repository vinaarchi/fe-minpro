"use client";

import * as React from "react";
import { useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import { customerValidationSchema } from "./EditProfile/validation/customerValidationSchema";
import { CustomerProfileFormValues } from "./EditProfile/types/ProfileFromValues";
import { callAPI } from "@/config/axios";

const CustomerEditProfile: React.FC = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleSubmit = async (values: CustomerProfileFormValues) => {
    try {
      const response = await callAPI.patch("/user/Edit-profile", {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <Formik
        initialValues={{
          email: "",
          phone: "",
          firstName: "",
          lastName: "",
          birthDate: "",
          gender: "male",
          profilePicture: null,
        }}
        validationSchema={customerValidationSchema}
        onSubmit={handleSubmit}
      >
        
      </Formik>
    </div>
  );
};

export default CustomerEditProfile;
