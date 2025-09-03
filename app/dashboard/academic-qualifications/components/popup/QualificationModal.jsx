import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';

// This component is dedicated to handling the modal's display and logic
export default function QualificationModal({
  showModal,
  modalMode,
  formData,
  errors,
  handleChange,
  setErrors, // ✅ added
  handleCloseModal,
  onQualificationAdded,
}) {
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!formData.acadqname) newErrors.acadqname = "Qualification Name is required";
  if (!formData.Remarks) newErrors.Remarks = "Remarks is required";
  if (!formData.Equalification) newErrors.Equalification = "Equivalent To is required";
  if (!formData.Preference) newErrors.Preference = "Preference is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    let url = "";
    let method = "POST"; // backend expects POST for both add + update?
    let body = {};

    if (modalMode === "add") {
      url = "http://dolphinapi.myportal.co.in/api/AddAcademicQualification";
      body = {
        acadqname: formData.acadqname,
        Remarks: formData.Remarks,
        Equalification: formData.Equalification,
        Preference: formData.Preference,
      };
    } else if (modalMode === "edit") {
      url = "http://dolphinapi.myportal.co.in/api/ModAcademicQualification";
      body = {
        acadq_code: formData.acadq_code, // 
        acadqname: formData.acadqname,
        Remarks: formData.Remarks,
        Equalification: formData.Equalification,
        OldValue: formData.OldValue, // Passing acadqname as Old Value
        Preference: formData.Preference,
      };
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        APIKey: "Sdt!@#321",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const result = await response.json();

      const normalizedQual = {
       acadq_code: result.acadq_code || formData.acadq_code, // 👈 use same key as DB
        acadqname: formData.acadqname,
        Remarks: formData.Remarks,
        Equalification: formData.Equalification,
        Preference: formData.Preference,
      };

      if (onQualificationAdded) {
        onQualificationAdded(normalizedQual);
      }

      handleCloseModal();
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg relative">
        <h2 className="text-lg font-medium mb-4">
          {modalMode === 'add'
            ? 'Add Qualification'
            : modalMode === 'view'
            ? 'View Qualification'
            : 'Modify Qualification'}
        </h2>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={handleCloseModal}
        >
          <IoMdClose size={20} />
        </button>

        {/* Qualification Name Field */}
        <div className="relative mb-6">
          <input
            type="text"
            id="acadqname"
            name="acadqname"
            value={formData.acadqname}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.acadqname ? 'border-red-500' : 'border-gray-500'
            }`}
            disabled={modalMode === 'view'}
          />
          <label
            htmlFor="acadqname"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float label-static"
          >
            Qualification Name
          </label>
          {errors.acadqname && (
            <p className="text-red-500 text-sm mt-1">{errors.acadqname}</p>
          )}
        </div>

        {/* Remarks Field */}
        <div className="relative mb-6">
          <input
            type="text"
            id="Remarks"
            name="Remarks"
            value={formData.Remarks}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.Remarks ? 'border-red-500' : 'border-gray-500'
            }`}
            disabled={modalMode === 'view'}
          />
          <label
            htmlFor="Remarks"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float label-static"
          >
            Remarks
          </label>
          {errors.Remarks && (
            <p className="text-red-500 text-sm mt-1">{errors.Remarks}</p>
          )}
        </div>

        {/* Equivalent To Field */}
        <div className="relative mb-6">
          <input
            type="text"
            id="Equalification"
            name="Equalification"
            value={formData.Equalification}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.Equalification ? 'border-red-500' : 'border-gray-500'
            }`}
            disabled={modalMode === 'view'}
          />
          <label
            htmlFor="Equalification"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float label-static"
          >
            Equivalent To
          </label>
          {errors.Equalification && (
            <p className="text-red-500 text-sm mt-1">{errors.Equalification}</p>
          )}
        </div>

        {/* Preference Field */}
        <div className="relative mb-6">
          <input
            type="number"
            id="Preference"
            name="Preference"
            value={formData.Preference}
            onChange={handleChange}
            placeholder=" "
            className={`peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 ${
              errors.Preference ? 'border-red-500' : 'border-gray-500'
            }`}
            disabled={modalMode === 'view'}
          />
          <label
            htmlFor="Preference"
            className="absolute top-3 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float label-static"
          >
            Preference
          </label>
          {errors.Preference && (
            <p className="text-red-500 text-sm mt-1">{errors.Preference}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          {modalMode !== 'view' && (
            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-green-400 text-white rounded-full cursor-pointer hover:bg-green-500"
            >
              {modalMode === 'add' ? 'Add' : 'Update'}
            </button>
          )}
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-red-200 text-red-400 rounded-full cursor-pointer hover:bg-red-300 hover:text-white"
          >
            {modalMode === 'view' ? 'Close' : 'Discard'}
          </button>
        </div>
      </div>
    </div>
  );
}
