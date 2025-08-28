'use client'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa6';
import { GoProject } from 'react-icons/go';
import { PiNotePencilLight } from 'react-icons/pi';
import { FaTrashAlt } from 'react-icons/fa';

export default function () {
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
                        <p className="cursor-pointer text-gray-600 hover:text-blue-500">Basic Details</p>
                        <p className="cursor-pointer text-gray-600 hover:text-blue-500">Address</p>
                        <p className="cursor-pointer text-gray-600 hover:text-blue-400">Qualifications</p>
                        <p className="cursor-pointer text-gray-600 hover:text-blue-500">Working Details</p>
                        <p className="cursor-pointer text-gray-600 hover:text-blue-500">Others</p>
                    </div>
                       


                    <div className="w=full h-170 bg-white mt-2 rounded-4xl shadow-sm  flex flex-col justify-center items-center">

                        <div className="w-[90%] h-78 bg-orange-400 rounded-4xl mt-4"> </div>
                        <div className="w-[90%] h-78 bg-emerald-600 rounded-4xl mt-4"></div>

                    </div>


                </div>
            </div>

        </div>
    )
}