'use client'
import React from 'react';

export default function NoticeBoardDashboard() {
  return (
    <div className="min-h-screen/2 w-[96%] md:w-[90%] max-w-[1600px] bg-primary shadow-xl rounded-2xl  mx-auto text-gray-900 dark:text-gray-100 p-4 sm:px-6 lg:px-8 transition-colors duration-300 flex items-center ">
      {/* Dashboard Header */}
      

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">

        {/* Card 1: Announcements */}
        <div className="bg-primary  rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Announcements 📢</h2>
          <ul className="space-y-3 text-sm ">
            <li className="flex items-start text-gray-600">
              <span className="text-lg text-yellow-500 mr-2">•</span> New policy updates posted on 14th Aug.
            </li>
            <li className="flex items-start text-gray-600">
              <span className="text-lg text-yellow-500 mr-2">•</span> Team meeting scheduled for Friday at 10 AM.
            </li>
            <li className="flex items-start text-gray-600">
              <span className="text-lg text-yellow-500 mr-2">•</span> Holiday notice for upcoming festival.
            </li>
          </ul>
          <button className="mt-5 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md">
            View All Announcements
          </button>
        </div>

        {/* Card 2: Upcoming Events */}
        <div className="md:col-span-2 lg:col-span-2 bg-primary rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-orange-700 dark:text-orange-400">Upcoming Events 📅</h2>
          <ul className="space-y-3 text-sm text-gray-700 ">
            <li className="flex justify-between items-center bg-gray-50  p-3 rounded-md">
              <span>Product Launch Webinar</span>
              <span className="font-medium text-blue-600 ">Aug 25, 2025</span>
            </li>
            <li className="flex justify-between items-center bg-gray-50  p-3 rounded-md">
              <span>Annual Team Retreat</span>
              <span className="font-medium text-blue-600 ">Sep 10-12, 2025</span>
            </li>
            <li className="flex justify-between items-center bg-gray-50  p-3 rounded-md">
              <span>Q3 Performance Review</span>
              <span className="font-medium text-blue-600 ">Oct 01, 2025</span>
            </li>
          </ul>
          <button className="mt-5 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md">
            View Calendar
          </button>
        </div>

        {/* Card 3: Quick Stats */}
        <div className="bg-primary rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-green-700 ">Quick Stats 📈</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <p className="text-3xl font-bold text-green-600 ">12</p>
              <p className="text-sm text-gray-600 ">Active Projects</p>
            </div>
            <div className="bg-gray-50  p-4 rounded-md shadow-sm">
              <p className="text-3xl font-bold text-purple-600 ">85%</p>
              <p className="text-sm text-gray-600 ">Completion Rate</p>
            </div>
            <div className="bg-gray-50   p-4 rounded-md shadow-sm">
              <p className="text-3xl font-bold text-orange-500 ">3</p>
              <p className="text-sm text-gray-600 ">Pending Tasks</p>
            </div>
            <div className="bg-gray-50   p-4 rounded-md shadow-sm">
              <p className="text-3xl font-bold text-blue-600 ">1.5K</p>
              <p className="text-sm text-gray-600 ">Total Users</p>
            </div>
          </div>
        </div>

        {/* Card 4: Important Links */}
        <div className="bg-primary rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-400">Important Links 🔗</h2>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <li><a href="#" className="flex items-center text-blue-600 hover:underline dark:text-blue-400"><span className="text-xl mr-2">→</span> Company Wiki</a></li>
            <li><a href="#" className="flex items-center text-blue-600 hover:underline dark:text-blue-400"><span className="text-xl mr-2">→</span> Support Portal</a></li>
            <li><a href="#" className="flex items-center text-blue-600 hover:underline dark:text-blue-400"><span className="text-xl mr-2">→</span> Team Directory</a></li>
            <li><a href="#" className="flex items-center text-blue-600 hover:underline dark:text-blue-400"><span className="text-xl mr-2">→</span> Feedback Form</a></li>
          </ul>
        </div>

        {/* Card 5: Personal Message (Your original content transformed) */}
        <div className="md:col-span-2 lg:col-span-1 bg-primary rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Personal Note 👋</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Hi, this is Manish! Wishing you a productive day. Let's make today count!
            </p>
          </div>
          <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-4">
            — Manish
          </p>
        </div>

        

      </div>
    </div>
  );
}
