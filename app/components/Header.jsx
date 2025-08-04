'use client';
import { useState } from 'react';
import { FiSearch, FiMoon } from 'react-icons/fi';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { BiMenuAltLeft } from 'react-icons/bi';

export default function Header({ isOpen, setIsOpen }) {
  const [search, setSearch] = useState('');

  return (
    <header className="bg-white shadow rounded-2xl mt-4 px-4 py-3 transition-all duration-300 w-full max-w-[1400px] mx-auto">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-white border rounded-full shadow-md hover:bg-gray-200"
          >
            <BiMenuAltLeft className="text-2xl text-gray-700" />
          </button>

          <nav className="flex items-center gap-4 text-sm text-gray-700 font-medium">
            <span className="cursor-pointer">
              Apps <span className="ml-1">▾</span>
            </span>
            <span className="cursor-pointer">Chat</span>
            <span className="cursor-pointer">Calendar</span>
            <span className="cursor-pointer">Email</span>
          </nav>
        </div>

        {/* Center Section: Search */}
        <div className="flex items-center border rounded-full px-4 py-1 w-72 bg-gray-50 justify-center">
          <FiSearch className="text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try to searching ..."
            className="outline-none bg-transparent text-sm px-2 w-full"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <FiMoon className="text-lg text-gray-600 cursor-pointer" />
          <HiOutlineChatBubbleOvalLeft className="text-xl text-gray-600 cursor-pointer" />
          <PiDotsSixVerticalBold className="text-xl text-gray-600 cursor-pointer" />

          {/* Profile with Hover Card */}
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="/assets/logo.png"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-gray-800">Mike Nielsen</p>
                <p className="text-gray-400 text-xs">Admin</p>
              </div>
              <span className="w-2 h-2 bg-green-500 rounded-full ml-1" />
            </div>

            {/* Hover Card */}
            <div className="absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-2xl p-5 border border-gray-200
 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">User Profile</h3>

              <div className="flex items-center gap-3 border-b pb-4 mb-4">
                <img
                  src="/assets/logo.png"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Mike Nielsen</p>
                  <p className="text-xs text-gray-500">super admin</p>
                  <p className="text-xs text-gray-400">info@spike.com</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                  <div className="bg-blue-100 text-blue-500 p-2 rounded-lg">
                    📄
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">My Profile</p>
                    <p className="text-xs text-gray-400">Account Settings</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                  <div className="bg-green-100 text-green-500 p-2 rounded-lg">
                    📥
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">My Inbox</p>
                    <p className="text-xs text-gray-400">Messages & Emails</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                  <div className="bg-red-100 text-red-500 p-2 rounded-lg">
                    ✅
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">My Task</p>
                    <p className="text-xs text-gray-400">To-do and Daily Tasks</p>
                  </div>
                </button>
              </div>

              <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-xl font-medium hover:bg-blue-600 transition">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden w-full gap-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-white border rounded-full shadow-md hover:bg-gray-200"
          >
            <BiMenuAltLeft className="text-2xl text-gray-700" />
          </button>

          <div className="flex items-center gap-3">
            <FiMoon className="text-lg text-gray-600 cursor-pointer" />
            <HiOutlineChatBubbleOvalLeft className="text-xl text-gray-600 cursor-pointer" />
            <PiDotsSixVerticalBold className="text-xl text-gray-600 cursor-pointer" />
            <img
              src="/assets/logo.png"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-center border rounded-full px-4 py-1 w-full bg-gray-50">
          <FiSearch className="text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try to searching ..."
            className="outline-none bg-white text-sm px-2 w-full"
          />
        </div>
      </div>
    </header>
  );
}
