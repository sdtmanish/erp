"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";

export default function EmployeeFormModal({
  showModal,
  modalMode,
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleCloseModal,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg relative">
        {/* Title */}
        <h2 className="text-lg font-medium mb-4">
          {modalMode === "add"
            ? "Add Employee"
            : modalMode === "view"
            ? "View Employee"
            : "Modify Employee"}
        </h2>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={handleCloseModal}
        >
          <IoMdClose size={20} />
        </button>

        {/* Name */}
        <div className="relative mb-6">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.name ? "border-red-500" : "border-gray-500"
            }`}
            disabled={modalMode === "view"}
          />
          <label
            htmlFor="name"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float"
          >
            Name
          </label>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Gender */}
        <div className="relative mb-6">
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.gender ? "border-red-500" : "border-gray-500"
            }`}
            disabled={modalMode === "view"}
          />
          <label
            htmlFor="gender"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float"
          >
            Gender
          </label>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.email ? "border-red-500" : "border-gray-500"
            }`}
            disabled={modalMode === "view"}
          />
          <label
            htmlFor="email"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float"
          >
            Email
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Contact */}
        <div className="relative mb-6">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.contact ? "border-red-500" : "border-gray-500"
            }`}
            disabled={modalMode === "view"}
          />
          <label
            htmlFor="contact"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float"
          >
            Contact
          </label>
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* DOB*/}
        <div className="relative mb-6">
          <input
            type="text"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.contact ? "border-red-500" : "border-gray-500"
            }`}
            disabled={modalMode === "view"}
          />
          <label
            htmlFor="dob"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float"
          >
            DOB
          </label>
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>
        {/* DOB*/}
        <div className="relative mb-6">
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.contact ? "border-red-500" : "border-gray-500"
            }`}
            disabled={modalMode === "view"}
          />
          <label
            htmlFor="designation"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float"
          >
            Designation
          </label>
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          {modalMode !== "view" && (
            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-green-400 text-white rounded-full cursor-pointer hover:bg-green-500"
            >
              {modalMode === "add" ? "Add" : "Update"}
            </button>
          )}
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-red-200 text-red-400 rounded-full cursor-pointer hover:bg-red-300 hover:text-white"
          >
            {modalMode === "view" ? "Close" : "Discard"}
          </button>
        </div>
      </div>
    </div>
  );
}
