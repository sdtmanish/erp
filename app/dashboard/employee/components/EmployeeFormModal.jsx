'use client';
import { useState } from 'react';

export default function EmployeeFormModal() {
    const [formData, setFormData] = useState({
        upload: null,
        employeeCode: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        gender: '',
        email: '',
        contact: '',
        department: '',
        designation: '',
        dateOfJoining: '',
        dateOfAnnv: '',
        panNo: '',
        pfAccountNo: '',
        bloodGroup: '',
        religion: '',
        fatherName: '',
        motherName: '',
        spouseName: '',
        addressPermanent: '',
        addressCorrespond: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleRegistration = async () => {
        const payload = { ...formData };
        console.log('Submitting Employee Data:', payload);
        // API submit logic here
    };

    return (
        <div className="bg-primary w-[96%] md:w-[90%] max-w-[1600px] mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Employee Registration Form</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">

                {/* Upload Photo Field - Placeholder will likely NOT be visible due to browser default behavior for file inputs */}
                <div className="relative mb-4">
                    <input
                        type="file"
                        id="upload" // Added ID for potential future use or if a custom label is needed via JS
                        name="upload"
                        placeholder="upload photo" // This placeholder will likely NOT be visible
                        onChange={handleChange}
                        className="w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                </div>

                {/* Employee Code Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="employeeCode"
                        name="employeeCode"
                        value={formData.employeeCode}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="employeeCode"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Employee Code
                    </label>
                </div>

                {/* First Name Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="firstName"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        First Name
                    </label>
                </div>

                {/* Middle Name Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="middleName"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="middleName"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Middle Name
                    </label>
                </div>

                {/* Last Name Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="lastName"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Last Name
                    </label>
                </div>

                <div className="relative mb-4">
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500  focus:text-gray-900"
                    />
                    <label
                        htmlFor="dob"
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Date of Birth
                    </label>
                </div>

                {/* Gender Field - Select elements typically don't use floating labels in the same way */}
                <div className="relative mb-4">
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    >
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {/* For select, a static label is more common, or you can style the option as a placeholder */}

                </div>

                {/* Email Field */}
                <div className="relative mb-4">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="email"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Email
                    </label>
                </div>

                {/* Contact Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="contact"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Contact
                    </label>
                </div>

                {/* Permanent Address Field */}
                <div className="relative mb-4 md:col-span-2 lg:col-span-3">
                    <textarea
                        id="addressPermanent"
                        name="addressPermanent"
                        value={formData.addressPermanent}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="addressPermanent"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Permanent Address
                    </label>
                </div>

                {/* Correspondence Address Field */}
                <div className="relative mb-4 md:col-span-2 lg:col-span-3">
                    <textarea
                        id="addressCorrespond"
                        name="addressCorrespond"
                        value={formData.addressCorrespond}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="addressCorrespond"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Correspondence Address
                    </label>
                </div>

                {/* Department Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="department"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Department
                    </label>
                </div>

                {/* Designation Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="designation"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Designation
                    </label>
                </div>

                {/* Date of Joining Field */}
                <div className="relative mb-4">
                    <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        placeholder=" "
                        // Keeping Tailwind classes for date input specific behavior
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500  focus:text-gray-900"
                    />
                    <label
                        htmlFor="dateOfJoining"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Date of Joining
                    </label>
                </div>

                {/* Date of Anniversary Field */}
                <div className="relative mb-4">
                    <input
                        type="date"
                        id="dateOfAnnv"
                        name="dateOfAnnv"
                        value={formData.dateOfAnnv}
                        onChange={handleChange}
                        placeholder=" "
                        // Keeping Tailwind classes for date input specific behavior
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500  focus:text-gray-900"
                    />
                    <label
                        htmlFor="dateOfAnnv"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Date of Anniversary
                    </label>
                </div>

                {/* PAN No Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="panNo"
                        name="panNo"
                        value={formData.panNo}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="panNo"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        PAN No
                    </label>
                </div>

                {/* PF Account No Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="pfAccountNo"
                        name="pfAccountNo"
                        value={formData.pfAccountNo}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="pfAccountNo"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        PF Account No
                    </label>
                </div>

                {/* Blood Group Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="bloodGroup"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="bloodGroup"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Blood Group
                    </label>
                </div>

                {/* Religion Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="religion"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Religion
                    </label>
                </div>

                {/* Father's Name Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="fatherName"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Father's Name
                    </label>
                </div>

                {/* Mother's Name Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="motherName"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="motherName"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Mother's Name
                    </label>
                </div>

                {/* Spouse Name Field */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        id="spouseName"
                        name="spouseName"
                        value={formData.spouseName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full py-3 px-3 border rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out focus:border-blue-400 border-gray-500"
                    />
                    <label
                        htmlFor="spouseName"
                        // Applying custom CSS classes for floating label effect
                        className="absolute top-3 left-3 text-gray-500 label-float label-static"
                    >
                        Spouse Name
                    </label>
                </div>
            </div>
            <button
                 className="px-8 py-2 bg-green-400 text-white rounded-full cursor-pointer hover:bg-green-500"
                onClick={handleRegistration}
            >
                Submit
            </button>
        </div>
    );
}
