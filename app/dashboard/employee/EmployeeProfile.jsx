'use client'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa6';
import { GoProject } from 'react-icons/go';
import { PiNotePencilLight } from 'react-icons/pi';
import { FaTrashAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { FaRegBuilding } from 'react-icons/fa';

export default function () {
    const [activeTab, setActiveTab] = useState('basic');

    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab')
        if (savedTab) setActiveTab(savedTab)

    }, [])

    useEffect(() => {

        localStorage.setItem('activeTab', activeTab)
    }, [activeTab])


    const tabs = [
        { id: "basic", label: "Basic Details" },
        { id: "address", label: "Address" },
        { id: "qualification", label: "Qualification" },
        { id: "working", label: "Working Details" },
        { id: "others", label: "Others" }
    ]
    const workData = [
  {
    title: "Organization",
    role: "Assistant Professor",
    period: "2001 - 2005",
    duration: "5 years",
    progress: 70,
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Organization",
    role: "Assistant Professor",
    period: "2001 - 2005",
    duration: "5 years",
    progress: 70,
    gradient: "from-orange-400 to-orange-600",
  },
  {
    title: "Organization",
    role: "Assistant Professor",
    period: "2021 - 2025",
    duration: "5 years",
    progress: 70,
    highlight: true, // special case
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Organization",
    role: "Assistant Professor",
    period: "2001 - 2005",
    duration: "5 years",
    progress: 70,
    gradient: "from-blue-400 to-blue-600",
  },
];


    return (
        <div className="w-[96%] md:w-[90%] max-w-[1600px]   py-6 mx-auto transition-all duration-300 z-50">
            <div className="flex flex-row justify-between gap-6  w-full ">

                <div className="bg-white w-100 h-190 rounded-4xl shadow-sm">
                    <div className="p-4">
                        <div className="flex flex-col justify-center items-center mt-10 ">

                            <div className="bg-[#d0d9e0] h-30 w-30 mx-auto flex justify-center items-center rounded-4xl">
                                <Image src="/assets/profile.jpg" alt="Employee Profile Picture"
                                    width="100" height="60" />
                            </div>
                            <h3 className="mt-2 text-lg font-medium">John Mednath</h3>
                            <p className="text-blue-400 bg-gray-200 text-sm font-normal px-2 rounded-lg">Teacher</p>

                            <div>

                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-6">

                            <div className="flex flex-row gap-1 items-center">
                                <div className="bg-emerald-100 w-10 h-10 rounded-4xl flex justify-center items-center"><FaCheck className="text-emerald-300" size="18" /></div>
                                <div className="flex flex-col">
                                    <h3>1.23k</h3>
                                    <p className="text-gray-400">Tasks Done</p>
                                </div>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <div className="bg-emerald-100 w-10 h-10 rounded-4xl flex justify-center items-center"><GoProject className="text-emerald-400" size="20" /></div>
                                <div className="flex flex-col">
                                    <h3>568</h3>
                                    <p className="text-gray-400">Projects Done</p>

                                </div>
                            </div>

                        </div>
                        <p className="mt-6">Details</p>
                        <hr className="text-gray-200 mt-2 mx-4"></hr>

                    </div>
                    <div className="flex flex-col gap-3 pl-6 pt-4">

                        <div className="flex flex-row gap-1">
                            <p>Name:</p>
                            <p className="font-light "> John Metheu</p>
                        </div>
                        <div className="flex flex-row gap-1">
                            <p>Employee Id:</p>
                            <p className="font-light "> 78364876498</p>
                        </div>
                        <div className="flex flex-row gap-1">
                            <p>Designation:</p>
                            <p className="font-light "> Assistant Professor</p>
                        </div>

                        <div className="flex flex-row gap-1">
                            <p>Email:</p>
                            <p className="font-light ">john@gmail.com</p>
                        </div>

                        <div className="flex flex-row gap-1">
                            <p>Data Of Birth:</p>
                            <p className="font-light ">03/05/2001</p>
                        </div>

                        <div className="flex flex-row gap-1">
                            <p>Phone:</p>
                            <p className="font-light ">+91-948473633</p>
                        </div>

                        <div className="flex flex-row gap-1">
                            <p>Address:</p>
                            <p className="font-light ">Dehradun, Uk</p>
                        </div>







                    </div>

                    <div className="flex flex-row justify-center gap-4 mt-8">
                        <button className="bg-blue-500 px-16 py-3 text-white rounded-3xl flex flex-row gap-1 items-center "> <PiNotePencilLight size="18" />Edit</button>
                        <button className="bg-red-300 px-14 py-3 text-white rounded-3xl flex flex-row gap-1 items-center"><FaTrashAlt />Delete</button>
                    </div>

                </div>






                <div className="flex-1 ml-1">

                    <div className="h-16 w-full bg-white rounded-4xl shadow-sm py-5 px-8 flex flex-row justify-center gap-30">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-2 transition-colors cursor-pointer ${activeTab === tab.id
                                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                                    : "text-gray-500 hover:text-blue-500"
                                }`}> {tab.label}</button>

                        ))}

                    </div>



                    {activeTab == "basic" &&
                        <div className="bg-white mt-4 w-full rounded-4xl shadow-sm  py-8 flex flex-col items-center  gap-4">
                            <h3 className="self-start ml-18 text-gray-600">Basic Details</h3>

                            <div className="w-[90%] rounded-4xl border border-gray-200 shadow-md mx-auto 
                grid grid-cols-2 gap-6 p-6">

                                {/* Address */}


                                <div className="relative">
                                    <input
                                        id="address"
                                        placeholder=" "
                                        value="Ring Road Dehradun "
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="address"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Address
                                    </label>
                                </div>

                                {/* Country */}
                                <div className="relative">
                                    <input
                                        id="country"
                                        placeholder=" "
                                        value="India"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="country"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Country
                                    </label>
                                </div>

                                {/* State */}
                                <div className="relative">
                                    <input
                                        id="state"
                                        placeholder=" "
                                        value="Uttarakhand"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="state"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        State
                                    </label>
                                </div>

                                {/* District */}
                                <div className="relative">
                                    <input
                                        id="district"
                                        placeholder=" "
                                        value="Tehri Garhwal"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="district"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        District
                                    </label>
                                </div>

                                {/* City */}
                                <div className="relative">
                                    <input
                                        id="city"
                                        placeholder=" "
                                        value="Chamba"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="city"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        City
                                    </label>
                                </div>

                                {/* Pin Code */}
                                <div className="relative">
                                    <input
                                        id="pincode"
                                        placeholder=" "
                                        value="248001"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="pincode"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Pin Code
                                    </label>
                                </div>
                            </div>





                        </div>
                    }


                    {activeTab == "address" &&
                        <div className="bg-white mt-4 w-full rounded-4xl shadow-sm  py-8 flex flex-col items-center  gap-4">
                            <h3 className="self-start ml-18 text-gray-600">Permanent Address</h3>
                            <div className="w-[90%] rounded-4xl border border-gray-200 shadow-md mx-auto 
                grid grid-cols-2 gap-6 p-6">

                                {/* Address */}

                                <div className="relative">
                                    <input
                                        id="address"
                                        placeholder=" "
                                        value="Ring Road Dehradun "
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="address"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Address
                                    </label>
                                </div>

                                {/* Country */}
                                <div className="relative">
                                    <input
                                        id="country"
                                        placeholder=" "
                                        value="India"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="country"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Country
                                    </label>
                                </div>

                                {/* State */}
                                <div className="relative">
                                    <input
                                        id="state"
                                        placeholder=" "
                                        value="Uttarakhand"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="state"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        State
                                    </label>
                                </div>

                                {/* District */}
                                <div className="relative">
                                    <input
                                        id="district"
                                        placeholder=" "
                                        value="Tehri Garhwal"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="district"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        District
                                    </label>
                                </div>

                                {/* City */}
                                <div className="relative">
                                    <input
                                        id="city"
                                        placeholder=" "
                                        value="Chamba"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="city"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        City
                                    </label>
                                </div>

                                {/* Pin Code */}
                                <div className="relative">
                                    <input
                                        id="pincode"
                                        placeholder=" "
                                        value="248001"
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none text-gray-700"
                                    />
                                    <label htmlFor="pincode"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Pin Code
                                    </label>
                                </div>
                            </div>
                            <h3 className="self-start ml-18 text-gray-600">Corresponding Address</h3>
                            <div className="w-[90%] rounded-4xl border border-gray-200 shadow-md mx-auto 
                grid grid-cols-2 gap-6 p-6">

                                {/* Address */}


                                <div className="relative">
                                    <input
                                        id="address"
                                        placeholder=" "
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none"
                                    />
                                    <label htmlFor="address"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Address
                                    </label>
                                </div>

                                {/* Country */}
                                <div className="relative">
                                    <input
                                        id="country"
                                        placeholder=" "
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none"
                                    />
                                    <label htmlFor="country"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Country
                                    </label>
                                </div>

                                {/* State */}
                                <div className="relative">
                                    <input
                                        id="state"
                                        placeholder=" "
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none"
                                    />
                                    <label htmlFor="state"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        State
                                    </label>
                                </div>

                                {/* District */}
                                <div className="relative">
                                    <input
                                        id="district"
                                        placeholder=" "
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none"
                                    />
                                    <label htmlFor="district"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        District
                                    </label>
                                </div>

                                {/* City */}
                                <div className="relative">
                                    <input
                                        id="city"
                                        placeholder=" "
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none"
                                    />
                                    <label htmlFor="city"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        City
                                    </label>
                                </div>

                                {/* Pin Code */}
                                <div className="relative">
                                    <input
                                        id="pincode"
                                        placeholder=" "
                                        className="peer w-full border border-gray-300 rounded-2xl px-3 py-3 outline-none"
                                    />
                                    <label htmlFor="pincode"
                                        className="absolute -top-2 left-4 bg-white px-1 text-blue-400 text-sm">
                                        Pin Code
                                    </label>
                                </div>
                            </div>
                        </div>
                    }


                    {activeTab == "qualification" &&
                        <div className="bg-white mt-4 w-full rounded-4xl shadow-sm px-8 py-6">
                            <h3 className="text-lg font-semibold">Qualification</h3>
                            <hr className="text-gray-200 mt-4" />

                            <div className="mt-6">
                                {/* Header Row */}
                                <div className="grid grid-cols-4 font-medium text-gray-700 border-b border-gray-200 pb-2">
                                    <p>Qualification</p>
                                    <p>Board / University</p>
                                    <p>Year</p>
                                    <p>Marks / Percentage</p>
                                </div>

                                {/* Data Rows */}
                                <div className="grid grid-cols-4 py-2 border-b border-gray-100">
                                    <p>Post Graduation</p>
                                    <p>Uttarakhand</p>
                                    <p>2023</p>
                                    <p>79%</p>
                                </div>

                                <div className="grid grid-cols-4 py-2 border-b border-gray-100">
                                    <p>Graduation</p>
                                    <p>Delhi University</p>
                                    <p>2021</p>
                                    <p>85%</p>
                                </div>

                                <div className="grid grid-cols-4 py-2 border-b border-gray-100">
                                    <p>Intermediate</p>
                                    <p>CBSE</p>
                                    <p>2017</p>
                                    <p>88%</p>
                                </div>
                                <div className="grid grid-cols-4 py-2 border-b border-gray-100">
                                    <p>HighSchool</p>
                                    <p>CBSE</p>
                                    <p>2015</p>
                                    <p>88%</p>
                                </div>
                            </div>
                        </div>

                    }

{activeTab === "working" && (
  <div className="bg-white mt-4 w-full rounded-4xl shadow-sm p-8 grid grid-cols-2 gap-6">
    
   
    {/* Card 4 */}
    <div className="relative p-6 border border-gray-200 rounded-t-xl flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center border-b border-b-gray-200 pb-2">
        <h3 className="text-lg font-semibold">Organization</h3>
        <div className="bg-emerald-100 p-3 rounded-4xl">
          <FaRegBuilding size={24} className="text-emerald-500" />
        </div>
      </div>
      <p>Assistant Professor</p>
     
        <p>2021 - 2025</p>
      
      <p>5 years</p>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 rounded-b-2xl overflow-hidden">
        <div className="h-1 w-[70%] bg-gradient-to-r from-blue-400 to-blue-600"></div>
      </div>
    </div>

   
    {/* Card 4 */}
    <div className="relative p-6 border border-gray-200 rounded-t-xl flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center border-b border-b-gray-200 pb-2">
        <h3 className="text-lg font-semibold">Organization</h3>
        <div className="bg-emerald-100 p-3 rounded-4xl">
          <FaRegBuilding size={24} className="text-emerald-500" />
        </div>
      </div>
      <p>Assistant Professor</p>

        <p>2021 - 2025</p>
    
      <p>5 years</p>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 rounded-b-2xl overflow-hidden">
        <div className="h-1 w-[70%] bg-gradient-to-r from-blue-400 to-blue-600"></div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="relative p-6 border border-gray-200 rounded-t-xl flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center border-b border-b-gray-200 pb-2">
        <h3 className="text-lg font-semibold">Organization</h3>
        <div className="bg-emerald-100 p-3 rounded-4xl">
          <FaRegBuilding size={24} className="text-emerald-500" />
        </div>
      </div>
      <p>Assistant Professor</p>

        <p>2021 - 2025</p>
    
      <p>5 years</p>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 rounded-b-2xl overflow-hidden">
        <div className="h-1 w-[70%] bg-gradient-to-r from-blue-400 to-blue-600"></div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="relative p-6 border border-gray-200 rounded-t-xl flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center border-b border-b-gray-200 pb-2">
        <h3 className="text-lg font-semibold">Organization</h3>
        <div className="bg-emerald-100 p-3 rounded-4xl">
          <FaRegBuilding size={24} className="text-emerald-500" />
        </div>
      </div>
      <p>Assistant Professor</p>

        <p>2021 - 2025</p>
      
      <p>5 years</p>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 rounded-b-2xl overflow-hidden">
        <div className="h-1 w-[70%] bg-gradient-to-r from-blue-400 to-blue-600"></div>
      </div>
    </div>

  </div>
)}



                    {activeTab == "others" &&
                        <div className="bg-white mt-4 w-full rounded-4xl shadow-sm px-8">Others</div>}


                </div>
            </div>

        </div>
    )
}