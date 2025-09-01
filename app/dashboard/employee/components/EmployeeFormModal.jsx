"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import Image from "next/image";

export default function EmployeeFormModal() {
  const [image, setImage] = useState(null);

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

    { id: "religion",
      name: "religion",
       label: "Religion",
       type: "select",
        options: [
          {value:"", label:"Select Religion"},
          {value:"hindu", label:"Hindu"},
          {value:"muslim", label:"Muslim"},
          {value:"christian", label:"Christian"},
          {value:"sikh", label:"Sikh"},
          {value:"other", label:"Other"}
        ]
         },
    { id: "category", name: "category", label: "Category", type: "text" },
    { id: "dob", name: "dob", label: "Date of Birth", type: "date" },
    {
      id: "maritalStatus",
      name: "maritalStatus",
      label: "Marital Status",
      type: "select",
      options: [
        { value: "", label: "Select Marital Status" },
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
        { value: "divorced", label: "Divorced" },
        { value: "widowed", label: "Widowed" },
      ],
    },
  ];

  const addressDetails = [
    

    // Permanent Address
    { id: "permAddressLine1", name: "permAddressLine1", label: "Address Line 1", type: "text" },
    { id: "permAddressLine2", name: "permAddressLine2", label: " Address Line 2", type: "text" },
    { id: "permCity", name: "permCity", label: "City", type: "text" },
    { id: "permState", name: "permState", label: "State", type: "text" },
    { id: "permPostalCode", name: "permPostalCode", label: "Postal Code", type: "text" },
    { id: "permCountry", name: "permCountry", label: "Country", type: "text" },

    // Correspondence Address
    { id: "corrAddressLine1", name: "corrAddressLine1", label: " Address Line 1", type: "text" },
    { id: "corrAddressLine2", name: "corrAddressLine2", label: " Address Line 2", type: "text" },
    { id: "corrCity", name: "corrCity", label: " City", type: "text" },
    { id: "corrState", name: "corrState", label: " State", type: "text" },
    { id: "corrPostalCode", name: "corrPostalCode", label: "Postal Code", type: "text" },
    { id: "corrCountry", name: "corrCountry", label: "Country", type: "text" },
  ];

  const employmentDetails = [
    {id:"employeeId", name:"employeeId", label:"Employee ID", type:"text"},
    {id:"department", name:"department", label:"Department", type:"text"},
    {id:"designation", name:"designation", label:"Designation", type:"text"},
    {id:"dateOfJoining", name:"dateOfJoining", label:"Date of Joining", type:"date"},
    {id:"employmentType", name:"employmentType", label:"Employment Type", type:"select", options:[
      {value:"", label:"Select Type"},
      {value:"full-time", label:"Full-Time"}, ]}
  ]

  const qualificationFields = [
    { id: "degree", label: "Degree / Diploma", type: "text" },
    { id: "specialization", label: "Specialization / Major Subject", type: "text" },
    { id: "university", label: "University / Board", type: "text" },
    { id: "yearOfPassing", label: "Year of Passing", type: "number" },
    { id: "percentage", label: "Percentage / CGPA", type: "text" },
  ];



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  return (
    <div className="w-[96%] md:w-[90%] max-w-[1600px] bg-white shadow-2xl rounded-2xl px-6 py-6 mx-auto transition-all duration-300 z-50">


      
      <div className="mt-8 text-center text-lg">

        <div className="flex flex-col ">

          <div className="flex flex-col-reverse items-center justify-center  border border-dashed border-gray-400 rounded-xl w-full p-8 gap-4">
            
            <div>
            <input type="file"
              accept="image/*"
              onChange={handleImageChange} className="hidden"
              id="profileImage"

            />
            <label htmlFor="profileImage" className=" cursor-pointer w-full py-3 px-6 rounded-4xl text-base outline-none   bg-[#f0f2f4] ">Upload  Photo</label>
            </div>

            {image ?(<div className=" bg-green  border border-gray-300 w-[120px] h-[120px]">
              <img src={image} alt="Profile Preview" className="w-full h-full object-cover rounded" />

            </div>) : (
               <span className="text-gray-500">Drag and drop or click to Upload (JPG, PNG, )</span>

           
              
            )}

            <h3 className="font-medium text-2xl">Upload Profile Photo</h3>

          </div>

          <h3 className="self-start mb-3 mt-4 font-medium text-2xl">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {basicDetails.map((field) =>
              field.type === "select" ? (
                <div key={field.id} className="flex flex-col text-left">
                  {/* <label htmlFor={field.id} className="mb-1 font-medium">
                    {field.label}
                  </label> */}
                  <select
                    id={field.id}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-3 cursor-pointer outline-none focus:border-blue-400 text-gray-500 text-base"
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


        </div>

      </div>


      <div className="flex flex-col">
        <h3 className="self-start mb-3  font-medium text-2xl">Permanent Address</h3>
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

        <h3 className="self-start mb-3  font-medium text-2xl">Corresponding Address</h3>
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

      </div>


      <div className="flex flex-col">
        <h3 className="text-2xl font-medium mb-3 self-start">Employment Details</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {employmentDetails.map((field, index)=>(
           <InputField 
           key={field.id}
           id={field.id}
           name={field.name}
           label={field.label}
           type={field.type}
           value={formData[field.name]}
           onChange={handleChange}
          
           />
        )

        )}
        </div>
      </div>



      <div className="flex flex-col ">
        <h3 className="text-lg font-semibold mb-4">Qualification Details</h3>

        {formData.qualifications.map((qualification, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 p-4 border border-dashed border-gray-400 rounded-lg"
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


      </div>


      {/* {step === 4 && <div>this is step 4</div>}
      {step === 5 && <div>this is step 5</div>} */}
    </div>
  );
}
