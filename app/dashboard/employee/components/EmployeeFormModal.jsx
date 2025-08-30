"use client";
import React, { useState } from "react";
import InputField from "./InputField";

export default function EmployeeFormModal() {
  const [step, setStep] = useState(1);

  // Form state (keys match field names)
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    contact: "",
    religion: "",
    category: "",
    dob: "",
    maritalStatus: "",
    qualifications: [
      { degree: "", specialization: "", university: "", yearOfPassing: "", percentage: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const steps = [
    "Basic Details",
    "Address",
    "Qualification",
    "Work Experience",
    "Other Details",
  ];

  const basicDetails = [
    {
      id: "salutation",
      name: "salutation",
      label: "Salutation",
      type: "select",
      options: [
        { value: "", label: "Select Salutation" },
        { value: "mr", label: "Mr." },
        { value: "mrs", label: "Mrs." },
        { value: "ms", label: "Ms." },
        { value: "dr", label: "Dr." },
      ],
    },
    { id: "firstName", name: "firstName", label: "First Name", type: "text" },
    { id: "lastName", name: "lastName", label: "Last Name", type: "text" },
    {
      id: "gender",
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: "", label: "Select Gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    { id: "email", name: "email", label: "Email", type: "email" },
    { id: "contact", name: "contact", label: "Contact", type: "text" },
    { id: "religion", name: "religion", label: "Religion", type: "text" },
    { id: "category", name: "category", label: "Category", type: "text" },
    { id: "dob", name: "dob", label: "Date of Birth", type: "date" },
    {
      id: "maritalStatus",
      name: "maritalStatus",
      label: "Marital Status",
      type: "select",
      options: [
        { value: "", label: "Select Status" },
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
        { value: "divorced", label: "Divorced" },
        { value: "widowed", label: "Widowed" },
      ],
    },
  ];

  const addressDetails = [
    // Correspondence Address
    { id: "corrAddressLine1", name: "corrAddressLine1", label: "Correspondence Address Line 1", type: "text" },
    { id: "corrAddressLine2", name: "corrAddressLine2", label: "Correspondence Address Line 2", type: "text" },
    { id: "corrCity", name: "corrCity", label: "Correspondence City", type: "text" },
    { id: "corrState", name: "corrState", label: "Correspondence State", type: "text" },
    { id: "corrPostalCode", name: "corrPostalCode", label: "Correspondence Postal Code", type: "text" },
    { id: "corrCountry", name: "corrCountry", label: "Correspondence Country", type: "text" },

    // Permanent Address
    { id: "permAddressLine1", name: "permAddressLine1", label: "Permanent Address Line 1", type: "text" },
    { id: "permAddressLine2", name: "permAddressLine2", label: "Permanent Address Line 2", type: "text" },
    { id: "permCity", name: "permCity", label: "Permanent City", type: "text" },
    { id: "permState", name: "permState", label: "Permanent State", type: "text" },
    { id: "permPostalCode", name: "permPostalCode", label: "Permanent Postal Code", type: "text" },
    { id: "permCountry", name: "permCountry", label: "Permanent Country", type: "text" },
  ];

  const qualificationFields = [
    { id: "degree", label: "Degree / Diploma", type: "text" },
    { id: "specialization", label: "Specialization / Major Subject", type: "text" },
    { id: "university", label: "University / Board", type: "text" },
    { id: "yearOfPassing", label: "Year of Passing", type: "number" },
    { id: "percentage", label: "Percentage / CGPA", type: "text" },
  ];

  return (
    <div className="w-[96%] md:w-[90%] max-w-[1600px] bg-white shadow-2xl rounded-2xl px-6 py-6 mx-auto transition-all duration-300 z-50">
      {/* Stepper */}
      <div className="flex flex-row justify-center items-center w-full">
        {steps.map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer font-medium
                  ${step === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                onClick={() => setStep(i + 1)}
              >
                {i + 1}
              </div>
              <span className="mt-2 text-sm">{label}</span>
            </div>
            {i !== steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 
                  ${step > i + 1 ? "bg-blue-500" : "bg-gray-300"}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-8 text-center text-lg">
        {step === 1 && (
          <div className="flex flex-col ">
            <h3 className="self-start mb-4">Basic Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {basicDetails.map((field) =>
                field.type === "select" ? (
                  <div key={field.id} className="flex flex-col text-left">
                    <label htmlFor={field.id} className="mb-1 font-medium">
                      {field.label}
                    </label>
                    <select
                      id={field.id}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-3 py-2"
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <InputField
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    type={field.type || "text"}
                    value={formData[field.name]}
                    onChange={handleChange}
                    label={field.label}
                  />
                )
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="self-end flex flex-row gap-4">
              <button
                className="bg-blue-500 px-3 py-2 text-white rounded-4xl cursor-pointer"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 px-8 py-2 text-white rounded-4xl cursor-pointer"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {step === 2 && (
        <div className="flex flex-col">
          <h3 className="self-start text-lg mb-4">Correspondence Address:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {addressDetails
              .filter((field) => field.id.startsWith("corr"))
              .map((field) => (
                <InputField
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
          </div>

          <h3 className="self-start text-lg mb-4">Permanent Address:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {addressDetails
              .filter((field) => field.id.startsWith("perm"))
              .map((field) => (
                <InputField
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
          </div>
          <div className="self-end flex flex-row gap-4">
            <button
              className="bg-blue-500 px-3 py-2 text-white rounded-4xl cursor-pointer"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 px-8 py-2 text-white rounded-4xl cursor-pointer"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col ">
          <h3 className="text-lg font-semibold mb-4">Qualification Details</h3>

          {formData.qualifications.map((qualification, index) => (
            <div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 p-4 border border-gray-400 rounded-lg"
            >
              {qualificationFields.map((field) => (
                <InputField
                  key={field.id}
                  id={`${field.id}-${index}`}
                  name={field.id}
                  type={field.type}
                  label={field.label}
                  value={qualification[field.id]}
                  onChange={(e) => {
                    const updated = [...formData.qualifications];
                    updated[index][field.id] = e.target.value;
                    setFormData({ ...formData, qualifications: updated });
                  }}
                />
              ))}

              {/* Delete button */}
              <button
                type="button"
                className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center 
                           rounded-full bg-white border border-red-500 text-red-500 
                           hover:bg-red-500 hover:text-white shadow"
                onClick={() => {
                  const updated = formData.qualifications.filter((_, i) => i !== index);
                  setFormData({ ...formData, qualifications: updated });
                }}
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add qualification */}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg w-50 mx-auto"
            onClick={() =>
              setFormData({
                ...formData,
                qualifications: [
                  ...formData.qualifications,
                  { degree: "", specialization: "", university: "", yearOfPassing: "", percentage: "" },
                ],
              })
            }
          >
            + Add Qualification
          </button>

          {/* Navigation */}
          <div className="mt-6 flex flex-row gap-4 self-end">
            <button
              className="bg-blue-500 px-3 py-2 text-white rounded-4xl cursor-pointer"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 px-8 py-2 text-white rounded-4xl cursor-pointer"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && <div>this is step 4</div>}
      {step === 5 && <div>this is step 5</div>}
    </div>
  );
}
