'use client';
import { useState } from 'react';
import { FiSearch, FiMoon } from 'react-icons/fi';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

export default function Header() {
  const [search, setSearch] = useState('');

  return (
    <header className="bg-white shadow rounded-2xl mt-4 px-4 py-3 w-full md:ml-24 md:mr-4 md:w-[calc(100%-16rem-1rem)]">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Desktop Layout */}
    <div className="hidden md:flex w-full items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <nav className="hidden md:flex items-center gap-4 text-sm text-gray-700 font-medium">
          <span className="cursor-pointer">Apps<span className="ml-1">▾</span></span>
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
          onChange={e => setSearch(e.target.value)}
          placeholder="Try to searching ..."
          className="outline-none bg-transparent text-sm px-2 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <FiMoon className="text-lg text-gray-600 cursor-pointer" />
        <HiOutlineChatBubbleOvalLeft className="text-xl text-gray-600 cursor-pointer" />
        <PiDotsSixVerticalBold className="text-xl text-gray-600 cursor-pointer" />
        <div className="flex items-center gap-2">
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
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="flex flex-col md:hidden w-full gap-4">
      <div className="flex items-center justify-between">
        <div />
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
          onChange={e => setSearch(e.target.value)}
          placeholder="Try to searching ..."
          className="outline-none bg-white text-sm px-2 w-full "
        />
      </div>
    </div>
  </div>
</header>

  );
}
