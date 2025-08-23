"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function EmployeeFormModal({ handleCloseModal, handleSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    contact: "",
    dob: "",
    designation: "",
  });

  const [preview, setPreview] = useState(null);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image input
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-[96%] md:w-[90%] max-w-[1600px] bg-white shadow-2xl rounded-2xl px-6 py-6 mx-auto transition-all duration-300 z-50">
        
      {/* Upload Image Section (unchanged) */}
      <div className="mb-8">
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <div className="w-40 h-40 border rounded-lg overflow-hidden shadow flex items-center justify-center bg-gray-100">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">No image selected</span>
            )}
          </div>
        </div>
        <p className="text-sm font-medium text-gray-700 mb-2 mt-4">
          Upload Image
        </p>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="image"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 w-40 text-white rounded-lg shadow cursor-pointer hover:bg-blue-600 transition"
        >
          <Upload size={16} />
          Choose File
        </label>
      </div>


        <h3>Basic Details:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         
      
        {/* Saltation*/}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Salutation
          </label>
        </div>

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Name
          </label>
        </div>

        {/* Gender */}
        <div className="relative">
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="gender"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Gender
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Email
          </label>
        </div>

      

        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Contact
          </label>
        </div>

        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Religion
          </label>
        </div>

        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Category
          </label>
        </div>


        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Contact
          </label>
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="dob"
            className="absolute left-3 -top-2 text-xs text-blue-500 bg-white px-1"
          >
            Date of Birth
          </label>
        </div>

        {/* Designation */}
        <div className="relative">
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="designation"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Marital Status
          </label>
        </div>
      </div>

      <h3>Permanent Address:</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Permanent Address
          </label>
        </div>

        {/* Gender */}
        <div className="relative">
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="gender"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            State
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            District
          </label>
        </div>

        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            City
          </label>
        </div>
       

       
      
     

        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Contact
          </label>
        </div>

       

       
      </div>

      <h3>Employee Joining Details:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Name
          </label>
        </div>

        {/* Gender */}
        <div className="relative">
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="gender"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Gender
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Email
          </label>
        </div>

        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Contact
          </label>
        </div>
        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Contact
          </label>
        </div>

        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Contact
          </label>
        </div>

        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Contact
          </label>
        </div>

        


        {/* Contact */}
        <div className="relative">
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="contact"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Contact
          </label>
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="dob"
            className="absolute left-3 -top-2 text-xs text-blue-500 bg-white px-1"
          >
            Date of Birth
          </label>
        </div>

        {/* Designation */}
        <div className="relative">
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent border-gray-300 focus:border-blue-400 "
          />
          <label
            htmlFor="designation"
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
          >
            Designation
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleCloseModal}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmit(formData)}
          className="px-8 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
