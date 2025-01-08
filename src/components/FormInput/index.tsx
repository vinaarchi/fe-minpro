/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
interface IFormInput {
  id?: string;
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  ref?: any;
  value?: string;
}

const FormInput: React.FC<IFormInput> = ({
  id,
  type,
  name,
  label,
  placeholder,
  onChange,
  ref,
  value,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  if (type === "password") {
    let icon;
    let activeType;
    if (isVisible) {
      icon = <FaRegEye style={{ margin: "auto" }} />;
      activeType = "text";
    } else {
      icon = <FaRegEyeSlash style={{ margin: "auto" }} />;
      activeType = "password";
    }

    return (
      <div>
        <label className="font-semibold">{label}</label>
        <div className="relative">
          <input
            id={name}
            name={name}
            ref={ref}
            type={activeType}
            placeholder={placeholder}
            className="w-full border border-gray-300 px-3 py-1 rounded-md shadow-md"
            onChange={onChange}
            value={value}
          />
          <button
            type="button"
            className="absolute right-1 top-1 w-12 p-1 rounded-md border"
            onClick={() => setIsVisible(!isVisible)}
          >
            {icon}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full gap-2">
        <label className="font-semibold">{label}</label>
        <input 
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-3 py-1 rounded-md shadow-md"
        onChange={onChange}
        value={value}
        />
    </div>
  )
};

export default FormInput;
