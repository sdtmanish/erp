"use client";
import React from "react";

export default function InputField({
  id,
  name,
  type = "text",
  value,
  onChange,
  label,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400"
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
          peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-3 pb-2"
      >
        {label}
      </label>
    </div>
  );
}
