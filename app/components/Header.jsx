'use client';
import { useState } from 'react';
import { FiSearch, FiMoon, FiSun } from 'react-icons/fi'; // Import FiSun
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import {useUser} from '../context/userContext';
import { useTheme } from '../context/ThemeContext'

export default function Header({ isOpen, setIsOpen }) {
  const [search, setSearch] = useState('');
  const {user} = useUser();
  const router = useRouter();
  
  // Use the useTheme hook to access theme state and the toggle function
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogOut = () => {
    router.push('/');
  };

  return (
    <div className="relative px-4 py-6">
      
      {/* Main Header Card */}
      <header className="relative z-10 w-[96%] md:w-[90%] max-w-[1600px] bg-primary shadow-xl rounded-2xl px-4 py-3 mx-auto transition-all duration-300">
        {/* Desktop Layout */}
        <div className="hidden xl:flex items-center justify-between w-full">
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-white border border-gray-200 cursor-pointer rounded-full shadow-md hover:bg-gray-200"
            >
              <BiMenuAltLeft className="text-2xl text-gray-700" />
            </button>

            <nav className="flex items-center gap-4 text-sm  font-medium">
              <span className="cursor-pointer">Apps ▾</span>
              <span className="cursor-pointer">Chat</span>
              <span className="cursor-pointer">Calendar</span>
              <span className="cursor-pointer">Email</span>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex items-center border border-gray-500 h-10 rounded-full px-4 py-1 w-60 bg-gray-50 justify-center">
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
            {/* Dark Mode Toggle */}
            <button onClick={toggleTheme} className="p-2 bg-transparent rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {isDarkMode ? (
                <FiSun className="text-lg text-yellow-400 cursor-pointer" />
              ) : (
                <FiMoon className="text-lg text-gray-600 cursor-pointer" />
              )}
            </button>
            <HiOutlineChatBubbleOvalLeft className="text-xl text-gray-600 cursor-pointer" />
            <PiDotsSixVerticalBold className="text-xl text-gray-600 cursor-pointer" />

            {/* Profile */}
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="/assets/logo.png"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden sm:block text-sm">
                  <p className="font-medium  ">{user.UserName}</p>
                  <p className="text-gray-400  text-xs">{user.UserType}</p>
                </div>
                <span className="w-2 h-2 bg-green-500 rounded-full ml-1" />
              </div>

              {/* Hover Card */}
              <div className="absolute right-0 mt-3 w-80 bg-primary shadow-xl rounded-2xl p-5 border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">User Profile</h3>

                <div className="flex items-center gap-3 border-b pb-4 mb-4">
                  <img
                    src="/assets/logo.png"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-500">{user.UserName}</p>
                    <p className="text-xs text-gray-500">{user.UserType}</p>
                    <p className="text-xs text-gray-400">{user.ClassDesination}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                  <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                    <div className="bg-blue-100 text-blue-500 p-2 rounded-lg">📄</div>
                    <div>
                      <p className="font-medium text-gray-600">My Profile</p>
                      <p className="text-xs text-gray-400">Account Settings</p>
                    </div>
                  </button>

                  <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                    <div className="bg-green-100 text-green-500 p-2 rounded-lg">📥</div>
                    <div>
                      <p className="font-medium text-gray-600">My Inbox</p>
                      <p className="text-xs text-gray-400">Messages & Emails</p>
                    </div>
                  </button>

                  <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                    <div className="bg-red-100 text-red-500 p-2 rounded-lg">✅</div>
                    <div>
                      <p className="font-medium text-gray-600">My Task</p>
                      <p className="text-xs text-gray-400">To-do and Daily Tasks</p>
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleLogOut}
                  className="w-full mt-4 bg-blue-500 text-white py-2 cursor-pointer rounded-xl font-medium hover:bg-blue-600 transition"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col xl:hidden w-full gap-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-white border rounded-full shadow-md hover:bg-gray-200"
            >
              <BiMenuAltLeft className="text-2xl text-gray-700" />
            </button>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button onClick={toggleTheme} className="p-2 bg-transparent rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                {isDarkMode ? (
                  <FiSun className="text-lg text-yellow-400 cursor-pointer" />
                ) : (
                  <FiMoon className="text-lg text-gray-600 cursor-pointer" />
                )}
              </button>
              <HiOutlineChatBubbleOvalLeft className="text-xl text-gray-600 cursor-pointer" />
              <PiDotsSixVerticalBold className="text-xl text-gray-600 cursor-pointer" />
              <img
                src="/assets/logo.png"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex items-center justify-center border border-gray-400 h-10 rounded-full px-4 py-1 w-[96%] bg-gray-50 mx-auto">
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
    </div>
  );
}